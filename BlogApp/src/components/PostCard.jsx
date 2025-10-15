import { Link } from 'react-router-dom';
import appwriteService from '../Appwrite/configurations';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 shadow-lg hover:shadow-2xl group-hover:border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/60">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-slate-800">
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                console.error('PostCard image failed to load:', e);
                // Try fallback to download URL
                e.target.src = appwriteService.getFileDownload(featuredImage);
              }}
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-800 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-300">
            {title}
          </h2>

          {/* Read more indicator */}
          <div className="flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
            <span>Read more</span>
            <svg
              className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 origin-left scale-x-0 transform bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-300 group-hover:scale-x-100"></div>
      </div>
    </Link>
  );
}

export default PostCard;
