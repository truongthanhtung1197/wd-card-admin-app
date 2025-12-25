export interface UserReview {
  id: number;
  reviewerId: number;
  userId: number;
  rating: number; // 1-5
  title: string;
  comment: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserReviewStats {
  userId: number;
  averageRating: number;
  totalReviews: number;
  ratingCounts?: {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
  };
}

export interface CreateUserReviewDto {
  orderId?: number;
  userId: number;
  rating: number;
  comment: string;
  isPublic?: boolean;
}

export interface UpdateUserReviewDto {
  rating?: number;
  title?: string;
  comment?: string;
  isPublic?: boolean;
}
