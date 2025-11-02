'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/lib/auth/hooks'
import { useMedicalRecords } from '@/lib/medical-records/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Plus,
  X,
  File,
  Loader2,
} from 'lucide-react'
import { format } from 'date-fns'

const recordTypes = [
  { value: 'lab_result', label: 'Lab Result', icon: '🧪' },
  { value: 'prescription', label: 'Prescription', icon: '💊' },
  { value: 'imaging', label: 'Imaging (X-ray, MRI, etc.)', icon: '🏥' },
  { value: 'note', label: 'Clinical Note', icon: '📝' },
  { value: 'other', label: 'Other', icon: '📄' },
]

export default function MedicalRecordsPage() {
  const { profile } = useAuth()
  const { records, loading, uploadRecord, deleteRecord, downloadRecord } =
    useMedicalRecords()
  const { toast } = useToast()

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [recordType, setRecordType] = useState<string>('lab_result')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please select a file smaller than 10MB.',
          variant: 'destructive',
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a file and enter a title.',
        variant: 'destructive',
      })
      return
    }

    try {
      setUploading(true)
      await uploadRecord(selectedFile, {
        record_type: recordType as any,
        title,
        description: description || undefined,
      })

      toast({
        title: 'Upload Successful',
        description: 'Your medical record has been uploaded.',
      })

      // Reset form
      setShowUploadModal(false)
      setSelectedFile(null)
      setTitle('')
      setDescription('')
      setRecordType('lab_result')
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload medical record. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (recordId: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return

    try {
      await deleteRecord(recordId)
      toast({
        title: 'Record Deleted',
        description: 'The medical record has been deleted.',
      })
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete record. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getRecordTypeLabel = (type: string) => {
    return recordTypes.find((t) => t.value === type)?.label || type
  }

  const getRecordTypeIcon = (type: string) => {
    return recordTypes.find((t) => t.value === type)?.icon || '📄'
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-deaf-blue" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
          <p className="text-gray-600">
            Securely manage and access your medical documents
          </p>
        </div>

        {profile.role === 'patient' && (
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-deaf-blue hover:bg-deaf-blue/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            Upload Record
          </Button>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upload Medical Record</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select File <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-deaf-blue hover:bg-deaf-blue/5 transition"
                >
                  {selectedFile ? (
                    <div>
                      <File className="w-12 h-12 text-deaf-blue mx-auto mb-2" />
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Click to select a file
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG, DOC (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Record Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Record Type <span className="text-red-500">*</span>
                </label>
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {recordTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Blood Test Results - Jan 2025"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional notes about this record..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deaf-blue"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 bg-deaf-blue hover:bg-deaf-blue/90"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Records List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-12 h-12 animate-spin text-deaf-blue" />
        </div>
      ) : records.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Medical Records
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't uploaded any medical records yet.
            </p>
            {profile.role === 'patient' && (
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-deaf-blue hover:bg-deaf-blue/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Upload Your First Record
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">
                      {getRecordTypeIcon(record.record_type)}
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">
                        {getRecordTypeLabel(record.record_type)}
                      </p>
                    </div>
                  </div>
                  {profile.role === 'patient' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <h3 className="font-semibold mb-2">{record.title}</h3>

                {record.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {record.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{format(new Date(record.created_at), 'MMM d, yyyy')}</span>
                  {record.file_size && (
                    <span>{formatFileSize(record.file_size)}</span>
                  )}
                </div>

                <Button
                  onClick={() => downloadRecord(record)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
