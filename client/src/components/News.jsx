import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/dataSlice";
import Notfound from "./Notfound/Notfound";

const SkeletonLoader = () => (
  <div className="skeleton w-full sm:w-[95%] md:w-[95%] lg:w-[80%] flex flex-col justify-center mb-6 p-4 border border-gray-200 ">
    <div className="image-box my-3">
      <div className="bg-gray-200 animate-pulse h-48 sm:w-[100%] lg:w-[60%] mx-auto" />
    </div>
    <div className="news-content mt-4">
      <div className="skeleton-title h-6 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
      <div className="skeleton-date h-4 bg-gray-200 animate-pulse w-1/4 mb-3"></div>
      <div className="skeleton-description h-4 bg-gray-200 animate-pulse w-full mb-2"></div>
      <div className="skeleton-content h-4 bg-gray-200 animate-pulse w-full mb-2"></div>
      <div className="skeleton-source h-4 bg-gray-200 animate-pulse w-1/3 mb-2"></div>
      <div className="skeleton-link h-4 bg-gray-200 animate-pulse w-1/4 mb-2"></div>
    </div>
  </div>
);

const News = () => {
  const news = useSelector((state) => state.data.news);
  const status = useSelector((state) => state.data.status);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchNews())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center w-full mt-5">
      {loading || status === "loading" ? (
        // Show skeleton loaders while loading
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))
      ) : news.length > 0 ? (
        // Render news articles if available
        news.map((article, index) => (
          <div
            key={index}
            className="news-item w-full sm:w-[95%] md:w-[95%] lg:w-[80%] flex flex-col justify-center mb-6"
          >
            <div className="image-box my-3">
              <div className="sm:w-[100%] lg:w-[60%]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              </div>
            </div>
            <div className="news-content">
              <h2>{article.title}</h2>
              <p className="news-date">
                Published on: {formatDate(article.publishedAt)}
              </p>
              <p className="description">{article.description}</p>
              <p className="content">{article.content}</p>
              <div className="flex items-center space-x-3">
                <p className="news-source">Source: {article.source.name}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read More...
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>
          <Notfound />
        </p>
      )}
    </div>
  );
};

export default News;
