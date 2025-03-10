import React from "react";
import { useGallery } from "../context/GalleryContext";
import ArtworkCard from "../components/ArtworkCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { filteredArtworks, galleries } = useGallery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Discover Artworks in the Curchod collection
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Explore our curated collection in the galleries below.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-12">
        <TagFilter />
      </div>

      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No artworks found matching your criteria.
          </p>
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Galleries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.slice(0, 3).map((gallery) => (
            <div
              key={gallery.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/gallery/${gallery.id}`} className="block">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {gallery.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{gallery.description}</p>
                  <span className="text-indigo-600 font-medium">
                    View Gallery →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
