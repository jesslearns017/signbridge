// Generated types from Supabase schema
// This will be auto-generated when we set up Supabase CLI

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'patient' | 'provider' | 'interpreter' | 'admin'
          first_name: string | null
          last_name: string | null
          preferred_language: string
          preferred_sign_language: string | null
          phone: string | null
          timezone: string | null
          communication_preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'patient' | 'provider' | 'interpreter' | 'admin'
          first_name?: string | null
          last_name?: string | null
          preferred_language?: string
          preferred_sign_language?: string | null
          phone?: string | null
          timezone?: string | null
          communication_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'patient' | 'provider' | 'interpreter' | 'admin'
          first_name?: string | null
          last_name?: string | null
          preferred_language?: string
          preferred_sign_language?: string | null
          phone?: string | null
          timezone?: string | null
          communication_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          date_of_birth: string | null
          medical_record_number: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          allergies: string | null
          medications: string | null
          conditions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          date_of_birth?: string | null
          medical_record_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          allergies?: string | null
          medications?: string | null
          conditions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date_of_birth?: string | null
          medical_record_number?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          allergies?: string | null
          medications?: string | null
          conditions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      providers: {
        Row: {
          id: string
          specialty: string | null
          license_number: string | null
          license_state: string | null
          bio: string | null
          languages: string[] | null
          created_at: string
        }
        Insert: {
          id: string
          specialty?: string | null
          license_number?: string | null
          license_state?: string | null
          bio?: string | null
          languages?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          specialty?: string | null
          license_number?: string | null
          license_state?: string | null
          bio?: string | null
          languages?: string[] | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          provider_id: string
          interpreter_id: string | null
          scheduled_start: string
          scheduled_end: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          reason: string | null
          needs_interpreter: boolean
          preferred_sign_language: string | null
          notes: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          actual_start: string | null
          actual_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          provider_id: string
          interpreter_id?: string | null
          scheduled_start: string
          scheduled_end: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          reason?: string | null
          needs_interpreter?: boolean
          preferred_sign_language?: string | null
          notes?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          actual_start?: string | null
          actual_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          provider_id?: string
          interpreter_id?: string | null
          scheduled_start?: string
          scheduled_end?: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          reason?: string | null
          needs_interpreter?: boolean
          preferred_sign_language?: string | null
          notes?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          actual_start?: string | null
          actual_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      video_sessions: {
        Row: {
          id: string
          appointment_id: string
          daily_room_name: string | null
          daily_room_url: string | null
          started_at: string | null
          ended_at: string | null
          duration_seconds: number | null
          recording_url: string | null
          participants: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          daily_room_name?: string | null
          daily_room_url?: string | null
          started_at?: string | null
          ended_at?: string | null
          duration_seconds?: number | null
          recording_url?: string | null
          participants?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          daily_room_name?: string | null
          daily_room_url?: string | null
          started_at?: string | null
          ended_at?: string | null
          duration_seconds?: number | null
          recording_url?: string | null
          participants?: Json | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          user_role: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          ip_address: string | null
          user_agent: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          user_role?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          user_role?: string | null
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'patient' | 'provider' | 'interpreter' | 'admin'
      appointment_status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Patient = Database['public']['Tables']['patients']['Row']
export type Provider = Database['public']['Tables']['providers']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type VideoSession = Database['public']['Tables']['video_sessions']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

export type UserRole = 'patient' | 'provider' | 'interpreter' | 'admin'
export type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
export type SignLanguage = 'ASL' | 'LSM' | 'LSE' | 'LSC' | 'LSA' | null

export interface CommunicationPreferences {
  prefers_captions: boolean
  prefers_text_chat: boolean
  prefers_sign_language: boolean
  caption_language: 'en' | 'es'
  text_to_speech_enabled: boolean
  voice_preference: string | null
}
