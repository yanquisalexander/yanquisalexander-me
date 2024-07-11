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
    image?: string;
    messageTemplate?: string;
    titleTemplate?: string;
    audioSrc?: string;
    volume?: number;
    duration?: number;
    probability?: Range<0, 1>;
    effect?: "confetti" | "none";
}

export interface Alert {
    type: "cheer" | "follow" | "sub";
    variants: AlertVariant[];
    variables?: Record<string, string | number>;
}

export const ALERTS: Record<string, Alert> = {
    cheer: {
        variants: [
            {
                image: "/twitch-assets/bits.gif",
                minBits: 1,
                messageTemplate: "Thank you for the cheer, $username!",
                titleTemplate: "Gracias $username",
                duration: 9000,
                effect: "confetti",
                audioSrc: "https://www.myinstants.com/media/sounds/twitch-bits-donation-sound-effect-sfx.mp3",
            },
            {
                image: "/twitch-assets/bits.gif",
                minBits: 50,
                messageTemplate: "Thank you for the cheer, $username!",
                titleTemplate: "Gracias $username",
                duration: 9000,
                effect: "confetti",
                audioSrc: "https://www.myinstants.com/media/sounds/twitch-bits-donation-sound-effect-sfx.mp3",
            },
            {
                image: "/twitch-assets/bits.gif",
                minBits: 100,
                messageTemplate: "TAMOS LOCOS? $username GRACIAS POR LOS $bits BITS",
                titleTemplate: "Gracias $username",
                duration: 9000,
                effect: "confetti",
                audioSrc: "https://www.myinstants.com/media/sounds/twitch-bits-donation-sound-effect-sfx.mp3",
            },
        ],
    },
    // Agrega otros tipos como "follow" o "sub" según sea necesario
};