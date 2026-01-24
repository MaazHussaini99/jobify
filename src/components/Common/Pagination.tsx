import React from 'react';
import './Common.css';

interface PaginationProps {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  loadingText?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  hasMore,
  isLoading = false,
  onLoadMore,
  loadMoreText = 'Load More',
  loadingText = 'Loading...'
}) => {
  if (!hasMore && !isLoading) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="btn btn-secondary load-more-btn"
        onClick={onLoadMore}
        disabled={isLoading || !hasMore}
      >
        {isLoading ? loadingText : loadMoreText}
      </button>
    </div>
  );
};

export default Pagination;
