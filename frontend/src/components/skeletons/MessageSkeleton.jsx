const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar */}
          <div
            className={`rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse ${
              idx % 2 === 0 ? "" : "order-2"
            } w-8 h-8`}
          ></div>

          {/* Message Bubble */}
          <div
            className={`flex flex-col gap-1 ${
              idx % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-[180px] h-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
