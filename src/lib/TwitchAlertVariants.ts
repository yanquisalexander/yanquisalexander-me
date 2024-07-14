type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>;

export interface AlertVariant {
    minBits?: number;
    messageTemplate?: string;
    audioSrc?: string;
    volume?: number;
    duration?: number;
    probability?: Range<0, 1>;
    effect?: "confetti" | "none";
    enableTTS?: boolean;
    ttsVolume?: number;
}

export interface Alert {
    type: "follow" | "sub" | "raid" | "host" | "cheer" | "donation" | "resub";
    variants: AlertVariant[];
    variables?: Record<string, string | number>;
}

export const ALERTS: Record<string, Partial<Alert>> = {
    cheer: {
        variants: [
            {
                minBits: 1,
                messageTemplate: `newCheering("$username", $bits)\n.then(() => \`$message\`)`,
                duration: 8000,
                effect: "confetti",
                audioSrc: "https://www.myinstants.com/media/sounds/twitch-bits-donation-sound-effect-sfx.mp3",
                enableTTS: true,
            },
           
        ],
    },
    follow: {
        variants: [
            {
                messageTemplate: `newFollower("$username")\n.then(() => "Bienvenido a la familia 💜"`,
                duration: 8000,
                audioSrc: '/twitch-assets/alerta-nuevo-seguidor.mp3',
                volume: 0.25,
            },
        ],
    },
    donation: {
        variants: [
            {
                messageTemplate: `newDonation("$username", $amount)\n.then(() => \`$message\`)`,
                duration: 15000,
               // audioSrc: "https://www.myinstants.com/media/sounds/twitch-donation-sound-effect.mp3",
                enableTTS: true,
            },
        ],
    },
    sub: {
        variants: [
            {
                messageTemplate: `newSubscriber("$username")\n.then(() => \`¡Se acaba de unir a la familia! 💜\`)`,
                duration: 8000,
                audioSrc: '/twitch-assets/nuevo-sub.mp3',
                volume: 1,
            },
        ],
    },
    resub: {
        variants: [
            {
                messageTemplate: `newResub("$username", $months)\n.then(() => \`$message\`)`,
                duration: 8000,
                audioSrc: '/twitch-assets/resub.mp3',
                volume: 1,
            },
        ],
    },
    raid: {
        variants: [
            {
                messageTemplate: `newRaid("$username", $raiders)\n.then(() => \`¡$username acaba de traer a $raiders espectadores! 💜\`)`,
                duration: 8000,
                audioSrc: '/twitch-assets/raid.mp3',
                volume: 1,
            },
        ],
    },
};