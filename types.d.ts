type ResponseMeta = {
  total_count: number;
  count: number;
  next?: { offset: number };
  can_include?: string[];
  can_query_by?: string[];
  parent: {
    id: string;
    type: string;
  };
};

type PlanningCenterResponse<TData> = {
  links: Record<string, string>;
  data: TData;
  meta: ResponseMeta;
};

type Song = {
  type: string;
  id: string;
  attributes: {
    admin: string;
    author: string;
    ccli_number: number;
    copyright: string;
    created_at: string;
    hidden: boolean;
    last_scheduled_at: string;
    last_scheduled_short_dates: string;
    notes: string[];
    themes: string;
    title: string;
    updated_at: string;
  };
  links: Record<string, string>;
};

type Relationship<T extends string> = {
  data: null | {
    type: T;
    id: string;
  };
};

type Arrangement = {
  type: 'Arrangement';
  id: string;
  attributes: {
    archived_at: null;
    bpm: null;
    chord_chart: string;
    chord_chart_chord_color: number;
    chord_chart_columns: number;
    chord_chart_font: string;
    chord_chart_font_size: number;
    chord_chart_key: string;
    created_at: string;
    has_chord_chart: true;
    has_chords: false;
    isrc: null;
    length: number;
    lyrics: string;
    lyrics_enabled: true;
    meter: null;
    name: string;
    notes: null;
    number_chart_enabled: false;
    numeral_chart_enabled: false;
    print_margin: string;
    print_orientation: string;
    print_page_size: string;
    rehearsal_mix_id: null;
    sequence: [];
    sequence_full: [];
    sequence_short: [];
    updated_at: string;
  };
  relationships: {
    updated_by: Relationship<'Person'>;
    created_by: Relationship<'Person'>;
    song: Relationship<'Song'>;
  };
  links: Record<string, string>;
};

type Attachment = {
  type: 'Attachment';
  id: string;
  attributes: {
    allow_mp3_download: boolean;
    content_type: null | 'audio/mpeg';
    created_at: string;
    display_name: string;
    downloadable: true;
    file_size: 0;
    filename: string;
    filetype: 'music' | 'audio';
    has_preview: boolean;
    linked_url: null;
    page_order: [];
    pco_type: 'AttachmentChart::Lyric' | 'AttachmentS3';
    remote_link: null;
    streamable: boolean;
    thumbnail_url: null;
    transposable: boolean;
    updated_at: string;
    url: string;
    web_streamable: boolean;
  };
  relationships: {
    attachable: Relationship<'Arrangement'>;
    attachment_types: { data: [] };
    created_by: Relationship<'Person'>;
    updated_by: Relationship<'Person'>;
  };
  links: Record<string, string>;
};
