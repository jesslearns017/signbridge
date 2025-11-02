'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth/hooks'

export interface MedicalRecord {
  id: string
  patient_id: string
  provider_id: string | null
  appointment_id: string | null
  record_type: 'lab_result' | 'prescription' | 'imaging' | 'note' | 'other'
  title: string
  description: string | null
  file_url: string | null
  file_name: string | null
  file_size: number | null
  created_at: string
  updated_at: string
}

export function useMedicalRecords(patientId?: string) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchRecords()
    }
  }, [user, patientId])

  async function fetchRecords() {
    try {
      setLoading(true)

      let query = supabase
        .from('medical_records')
        .select('*')
        .order('created_at', { ascending: false })

      // If user is a patient, only show their records
      if (profile?.role === 'patient') {
        query = query.eq('patient_id', user!.id)
      }
      // If provider or admin, can filter by patient
      else if (patientId) {
        query = query.eq('patient_id', patientId)
      }

      const { data, error } = await query

      if (error) throw error
      setRecords(data || [])

      // Audit log
      if (user) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          action: 'view',
          resource_type: 'medical_records',
          resource_id: patientId || user.id,
        })
      }
    } catch (error) {
      console.error('Error fetching medical records:', error)
    } finally {
      setLoading(false)
    }
  }

  async function uploadRecord(
    file: File,
    data: {
      record_type: MedicalRecord['record_type']
      title: string
      description?: string
      patient_id?: string
      appointment_id?: string
    }
  ) {
    if (!user) throw new Error('User not authenticated')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `medical-records/${data.patient_id || user.id}/${fileName}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('medical-records')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('medical-records').getPublicUrl(filePath)

      // Create record in database
      const { data: record, error: dbError } = await supabase
        .from('medical_records')
        .insert({
          patient_id: data.patient_id || user.id,
          provider_id: profile?.role === 'provider' ? user.id : null,
          appointment_id: data.appointment_id || null,
          record_type: data.record_type,
          title: data.title,
          description: data.description || null,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
        })
        .select()
        .single()

      if (dbError) throw dbError

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'upload',
        resource_type: 'medical_record',
        resource_id: record.id,
        metadata: {
          file_name: file.name,
          file_size: file.size,
          record_type: data.record_type,
        },
      })

      await fetchRecords()
      return record
    } catch (error) {
      console.error('Error uploading record:', error)
      throw error
    }
  }

  async function deleteRecord(recordId: string) {
    if (!user) throw new Error('User not authenticated')

    try {
      const record = records.find((r) => r.id === recordId)
      if (!record) throw new Error('Record not found')

      // Delete file from storage
      if (record.file_url) {
        const path = record.file_url.split('/medical-records/')[1]
        await supabase.storage.from('medical-records').remove([path])
      }

      // Delete from database
      const { error } = await supabase
        .from('medical_records')
        .delete()
        .eq('id', recordId)

      if (error) throw error

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'delete',
        resource_type: 'medical_record',
        resource_id: recordId,
      })

      await fetchRecords()
    } catch (error) {
      console.error('Error deleting record:', error)
      throw error
    }
  }

  async function downloadRecord(record: MedicalRecord) {
    if (!user) throw new Error('User not authenticated')

    try {
      if (!record.file_url) throw new Error('No file URL')

      // Audit log
      await supabase.from('audit_logs').insert({
        user_id: user.id,
        action: 'download',
        resource_type: 'medical_record',
        resource_id: record.id,
      })

      // Open file in new tab
      window.open(record.file_url, '_blank')
    } catch (error) {
      console.error('Error downloading record:', error)
      throw error
    }
  }

  return {
    records,
    loading,
    fetchRecords,
    uploadRecord,
    deleteRecord,
    downloadRecord,
  }
}
