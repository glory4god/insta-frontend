import mongoose from 'mongoose';

export interface SearchHistoryProps {
  searcher: string;
  searched: string;
  createdDate: Date;
}

const SearchHistorySchema = new mongoose.Schema<SearchHistoryProps>({
  searcher: {
    type: String,
    required: true,
    unique: false,
  },
  searched: {
    type: String,
    required: true,
    unique: false,
  },
},
  { timestamps: true }
);

export default mongoose.models.SearchHistory ||
  mongoose.model('SearchHistory', SearchHistorySchema, 'searchHistories');
