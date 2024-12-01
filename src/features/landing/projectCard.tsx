import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProjectCard = ({
  title,
  serial,
  route,
  imageSrc,
  subtitle,
}: {
  title: string;
  serial: string;
  route: string;
  imageSrc: string;
  subtitle: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center w-full space-x-8 h-[180px] rounded-2xl cursor-pointer"
      onClick={() => router.push(route)}
    >
      <div className="flex items-center justify-center">
        <div className="text-[50px] md:text-[180px] text-center font-bold text-black/10">
          {serial}
        </div>
      </div>

      <div className="w-full h-[134px] relative">
        <Image
          src={imageSrc}
          fill
          className="rounded-2x object-cover"
          unoptimized
          alt=""
          loader={() => imageSrc}
        />
        <div className="absolute bottom-0 text-white px-4 pb-4 backdrop:blur space-y-2 w-full">
          <div className="text-2xl md:text-5xl font-bold ">{title}</div>
          <div className="text-base font-bold top-40 ">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
