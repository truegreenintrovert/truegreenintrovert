import { API_URL } from '../../../lib/api';
import React, { useState, useEffect } from 'react';

export default function ContactMessages({ token }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(API_URL + '/api/messages', {
      headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => console.error("Failed to fetch messages"));
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Recent Messages</h2>
      {messages.length === 0 ? (
        <div className="text-brand-text-muted text-center py-10">No messages yet.</div>
      ) : (
        <div className="space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className="bg-brand-bg p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-brand-primary-light text-sm hover:underline">{msg.email}</a>
                </div>
                <span className="text-xs text-brand-text-muted bg-white/5 px-3 py-1 rounded-full">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="font-semibold text-brand-text mb-2">Subject: {msg.subject}</p>
                <p className="text-brand-text-muted whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
