export const getStreamLabsConfig = async () => {
    const widgetConfigs = await fetch('/streamlabs/config')
        .then(res => res.json())

    const { muted, pausedQueue } = widgetConfigs;

    return { muted, pausedQueue };
}