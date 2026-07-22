// Recent actvity card that is on sellers dashboard - Boiketlo

import {ClipboardDocumentListIcon} from '@heroicons/react/24/outline';
import { inter } from '../fonts';

export default async function RecentActivity() {
     return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Recent Activity
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

       
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">No recent activity</h3>
        </div>
      </div>
  );
}