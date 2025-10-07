import { Link } from 'react-router-dom';
import appwriteService from '../Appwrite/configurations';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-gray-200">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                console.error('PostCard image failed to load:', e);
                // Try fallback to download URL
                e.target.src = appwriteService.getFileDownload(featuredImage);
              }}
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>

          {/* Read more indicator */}
          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
            <span>Read more</span>
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
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
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}

export default PostCard;
