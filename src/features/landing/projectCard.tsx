import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProjectCard = ({
  title,
  serial,
  route,
  imageSrc,
  subtitle,
  color,
}: {
  title: string;
  serial: string;
  route: string;
  imageSrc: string;
  subtitle: string;
  color: string;
}) => {
  const router = useRouter();

  return (
<div
  className="flex items-center w-full space-x-8 h-[180px] rounded-2xl cursor-pointer group"
  onClick={() => router.push(route)}
>
  <div className="flex items-center justify-center text-black/10 group-hover:text-gray-800 transition-colors duration-300">
    <div className="text-[50px] md:text-[180px] text-center font-bold">
      {serial}
    </div>
  </div>

  <div className="w-full h-[134px] relative rounded-2xl shadow-inner bg-white group">
    <Image
      src={imageSrc}
      fill
      className="rounded-2xl object-cover object-bottom border border-gray-300/50  transition-shadow duration-300 group-hover:shadow-2xl"
      unoptimized
      alt=""
    />
    <div
      className="border border-gray-300/50 rounded-2xl absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-30 backdrop-blur-sm block group-hover:hidden transition-all duration-300"
    ></div>
    <div
      className="absolute bottom-0 px-4 pb-4 backdrop:blur space-y-2 w-full"
      style={{ color }}
    >
      <div className="text-2xl md:text-5xl font-bold">{title}</div>
      <div className="text-base font-bold">{subtitle}</div>
    </div>
  </div>
</div>





  );
};
export default ProjectCard;
