'use client'

import React, { useState, useCallback } from 'react'
import { useDocumentInfo, useForm } from '@payloadcms/ui'
import { sendReplyEmail } from '@/app/actions/admin/reply'

export function SubmissionEmailView() {
  const { doc, collectionSlug } = useDocumentInfo()
  const { getData } = useForm()

  // Use doc from useDocumentInfo, fallback to form data
  const data = doc || getData() || {}

  const [replySubject, setReplySubject] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // Extract fields generically based on collection
  const email = (data.email as string) || ''
  const name = (data.name as string) || (data.fullName as string) || ''
  const firstName = (data.firstName as string) || ''
  const lastName = (data.lastName as string) || ''
  const displayName = name || `${firstName} ${lastName}`.trim() || 'Anonymous'
  const phone = (data.phone as string) || ''
  const subject = (data.subject as string) || ''
  const message = (data.message as string) || ''
  const type = (data.type as string) || ''
  const interest = (data.interest as string) || ''
  const createdAt = data.createdAt ? new Date(data.createdAt as string).toLocaleString() : ''
  const status = (data.status as string) || ''

  const handleSendReply = useCallback(
    async () => {
      if (!email || !replySubject.trim() || !replyMessage.trim()) return

      setSending(true)
      setResult(null)

      try {
        const formData = new FormData()
        formData.append('to', email)
        formData.append('subject', replySubject)
        formData.append('message', replyMessage)
        formData.append('originalMessage', message)
        formData.append('senderName', displayName)

        const res = await sendReplyEmail(formData)
        setResult({ success: true, message: res.message })
        setReplySubject('')
        setReplyMessage('')
      } catch (err: any) {
        setResult({ success: false, message: err?.message || 'Failed to send reply' })
      } finally {
        setSending(false)
      }
    },
    [email, replySubject, replyMessage, message, displayName]
  )

  if (!email) {
    return (
      <div style={{ padding: '16px', color: '#666', fontStyle: 'italic' }}>
        Loading submission details...
      </div>
    )
  }

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Email Letter View */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '2px solid #f3f4f6',
            paddingBottom: '16px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {subject || 'New Submission'}
              </h2>
              <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                <div>
                  <strong>From:</strong>{' '}
                  <span style={{ color: '#374151' }}>{displayName}</span>
                </div>
                <div>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${email}`}
                    style={{ color: '#2563eb', textDecoration: 'none' }}
                  >
                    {email}
                  </a>
                </div>
                {phone && (
                  <div>
                    <strong>Phone:</strong>{' '}
                    <span style={{ color: '#374151' }}>{phone}</span>
                  </div>
                )}
                {type && (
                  <div>
                    <strong>Type:</strong>{' '}
                    <span
                      style={{
                        textTransform: 'capitalize',
                        color: '#374151',
                      }}
                    >
                      {type}
                    </span>
                  </div>
                )}
                {interest && (
                  <div>
                    <strong>Interest:</strong>{' '}
                    <span
                      style={{
                        textTransform: 'capitalize',
                        color: '#374151',
                      }}
                    >
                      {interest.replace('-', ' ')}
                    </span>
                  </div>
                )}
                {createdAt && (
                  <div>
                    <strong>Received:</strong>{' '}
                    <span style={{ color: '#374151' }}>{createdAt}</span>
                  </div>
                )}
                {status && (
                  <div>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        backgroundColor:
                          status === 'new'
                            ? '#dbeafe'
                            : status === 'read' || status === 'reviewed'
                              ? '#fef3c7'
                              : '#f3f4f6',
                        color:
                          status === 'new'
                            ? '#1e40af'
                            : status === 'read' || status === 'reviewed'
                              ? '#92400e'
                              : '#4b5563',
                      }}
                    >
                      {status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div
          style={{
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            padding: '20px',
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#1f2937',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {message || <em style={{ color: '#9ca3af' }}>No message provided.</em>}
        </div>
      </div>

      {/* Reply Form */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
          }}
        >
          Reply to {displayName}
        </h3>

        {result && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '14px',
              backgroundColor: result.success ? '#d1fae5' : '#fee2e2',
              color: result.success ? '#065f46' : '#991b1b',
              border: `1px solid ${result.success ? '#a7f3d0' : '#fecaca'}`,
            }}
          >
            {result.message}
          </div>
        )}

        <div>
          <div style={{ marginBottom: '12px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '4px',
              }}
            >
              Subject
            </label>
            <input
              type="text"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              placeholder="Re: Your submission"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#111827',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '4px',
              }}
            >
              Message
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply here..."
              required
              rows={6}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#111827',
                backgroundColor: '#fff',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                lineHeight: 1.5,
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSendReply}
            disabled={sending || !replySubject.trim() || !replyMessage.trim()}
            style={{
              padding: '8px 20px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: sending ? 'not-allowed' : 'pointer',
              opacity: sending || !replySubject.trim() || !replyMessage.trim() ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {sending ? 'Sending...' : 'Send Reply'}
          </button>
        </div>
      </div>
    </div>
  )
}

