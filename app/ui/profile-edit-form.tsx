'use client';
import { useState } from 'react';
import { updateProfile } from '@/lib/actions';
import { ProfileData } from '@/lib/definitions';

export default function ProfileForm({ userId, data }: { userId: string, data: ProfileData }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    setSuccess(null);

    const result = await updateProfile(formData);

    if (result?.message) {
      if (result.message === 'Profile updated!') {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    }

    setIsPending(false);
  };

  return (
    <form action={handleSubmit} className="mt-8 space-y-4">
      <input type="hidden" name="userId" value={userId} />

      {/* Error Banner */}
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium">
          {success}
        </div>
      )}

      <label className="block text-xs font-bold text-gray-400">PROFILE IMAGE URL</label>
      <input name="imageUrl" defaultValue={data?.image_url || ''} placeholder="https://example.com/photo.jpg" className="w-full p-4 bg-gray-50 rounded-2xl" />

      <label className="block text-xs font-bold text-gray-400">LOCATION</label>
      <input name="location" defaultValue={data?.location || ''} className="w-full p-4 bg-gray-50 rounded-2xl" />

      <label className="block text-xs font-bold text-gray-400">BIO / STORY</label>
      <textarea name="bio" defaultValue={data?.bio || ''} className="w-full p-4 bg-gray-50 rounded-2xl min-h-[100px]" />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-black transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            SAVING...
          </span>
        ) : (
          'SAVE PROFILE'
        )}
      </button>
    </form>
  );
}
