//Card component that will be used for dashboard - Boiketlo

import {
  UserGroupIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { geistSans } from '../fonts';
//import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  customers: UserGroupIcon,
  rating: StarIcon,
};

export default async function CardWrapper() {


  return (
    <>
      <Card title="Avg. Rating" value={''} type="rating" />
      <Card
        title="Total Customers"
        value={''}
        type="customers"
      /> 
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'rating' | 'customers';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2  shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${geistSans.className}
          truncate rounded-2xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}