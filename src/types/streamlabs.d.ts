export interface SLabsWidgetConfig {
    js?:                   JS;
    usernames?:            ClientIDS;
    images?:               ClientIDS;
    oauths?:               ClientIDS;
    encrypted_oauths?:     ClientIDS;
    settings?:             { [key: string]: Array<PurpleSetting | string> | boolean | FluffySetting | number | null | string };
    client_ids?:           ClientIDS;
    thirdpartyclient_ids?: any[];
    slobs?:                number;
    exchange_rates?:       { [key: string]: number };
    eventsPanelMuted?:     boolean;
    widgetPreviewMuted?:   boolean;
    flags?:                Flags;
    primary_account?:      string;
    scopes?:               ClientIDS;
    platforms?:            Platforms;
    platforms2?:           ClientIDS;
    thirdpartyplatforms?:  any[];
}

export interface ClientIDS {
    twitch_account?:     string[] | null | string;
    tiktok_account?:     any[] | null | string;
    streamlabs_account?: any[] | null | string;
}

export interface Flags {
    hasBitsVariations?:                 HasBitsVariations;
    hasSubsVariations?:                 HasBitsVariations;
    onboardingDisplayed?:               HasBitsVariations;
    "streampress-onboarding-complete"?: HasBitsVariations;
}

export interface HasBitsVariations {
    user_id?: number;
    flag?:    string;
    value?:   string;
}

export interface JS {
    worker?: string;
}

export interface Platforms {
    twitch_account?: string;
}

export interface PurpleSetting {
    uuid?:          string;
    name?:          string;
    conditions?:    Condition[];
    condition?:     string;
    conditionData?: number | string;
    settings?:      Settings;
    type?:          string;
    paused?:        boolean;
}

export interface Condition {
    type?:        string;
    description?: string;
}

export interface Settings {
    layout?:                  string;
    showAnimation?:           string;
    hideAnimation?:           string;
    text?:                    Text;
    image?:                   Image;
    sound?:                   Sound;
    duration?:                number;
    textDelay?:               number;
    customHtmlEnabled?:       boolean;
    customHtml?:              string;
    customJs?:                string;
    customCss?:               string;
    customJson?:              null;
    donationClippingEnabled?: boolean;
    merchUseCustomImage?:     boolean;
}

export interface Image {
    href?: string;
}

export interface Sound {
    href?:   string;
    volume?: number;
}

export interface Text {
    format?:    string;
    animation?: string;
    font?:      string;
    size?:      number;
    thickness?: number;
    color?:     string;
    color2?:    string;
}

export interface FluffySetting {
    enabled?:             null;
    allowed_types?:       string[];
    min_amount_to_share?: number;
    price_per_second?:    number;
    max_duration?:        number;
    volume?:              number;
    security?:            number;
    auto_show_video?:     boolean;
    advanced_settings?:   AdvancedSettings;
}

export interface AdvancedSettings {
    enabled?:                       boolean;
    moderation_queue?:              boolean;
    volume?:                        number;
    auto_play?:                     boolean;
    auto_show?:                     boolean;
    buffer_time?:                   number;
    min_amount_to_share?:           number;
    price_per_second?:              number;
    max_duration?:                  number;
    security?:                      number;
    requests_enabled?:              boolean;
    new_icon?:                      boolean;
    media_progress_bar?:            boolean;
    progress_bar_background_color?: string;
    progress_bar_text_color?:       string;
    backup_playlist_enabled?:       boolean;
    subscriber_price_enabled?:      boolean;
    subscriber_price_per_second?:   number;
    prioritize_donations?:          boolean;
    moderate_licensed_content?:     boolean;
}
