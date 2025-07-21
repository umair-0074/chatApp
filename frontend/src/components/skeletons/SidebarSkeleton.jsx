import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-full bg-white border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <span className="font-semibold text-base hidden md:block">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-4">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full px-4 py-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative">
              <div className="skeleton size-12 rounded-full bg-gray-300" />
            </div>

            {/* User info skeleton */}
            <div className="hidden md:block text-left flex-1 space-y-2">
              <div className="skeleton h-4 w-32 bg-gray-300 rounded" />
              <div className="skeleton h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
