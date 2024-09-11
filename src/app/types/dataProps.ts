export interface DataProps {
  video_id: string;
  title: string;
  section: string;
  duration: string;
  upload_date: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  subscribers: number;
  score: number;
  summary_data: SummaryData;
  channel_details: ChannelDetails;
}

export interface SummaryData {
  headline_title: string;
  headline_sub_title: string;
  short_summary: string;
  section: Section[];
}

export interface Section {
  title: string;
  detail_contents: string;
  start_time: string;
  explanation_keyword: string;
  explanation_description: string;
}

export interface ChannelDetails {
  channel_id: string;
  channel_name: string;
  channel_subscribers: number;
  channel_video_count: number;
  channel_view_count: number;
  channel_thumbnail: string;
  channel_banner: string;
}
