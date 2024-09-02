export interface DataProps {
  id: string;
  section: string;
  template_summary: TemplateSummary[];
  headline_title: string;
  headline_subtitle: string;
  short_summary: string;
  title: string;
  upload_date: string;
  duration: string;
  thumbnail: string;
  channel_id: string;
  detail_category: string;
  views: number;
  likes: number;
  comments: number;
  engagement_score: number;
  composite_score: number;
  channel_name: string;
  channel_thumbnail: string;
  channel_subscribers: number;
  channel_video_count: number;
  channel_view_count: number;
  channel_banner: string;
}

interface TemplateSummary {
  title: string;
  detail_contents: string;
  start_time: string;
  explanation_keyword: string;
  explanation_description: string;
}
