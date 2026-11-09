import styles from "./store-badges.module.css";

export const storeLinks = {
  googlePlay: null as string | null,
  appStore: null as string | null,
};

type StoreBadgesProps = { turkish: boolean };

export default function StoreBadges({ turkish }: StoreBadgesProps) {
  const stores = [
    {
      href: storeLinks.googlePlay,
      name: "Google Play",
      overline: turkish ? "Çok yakında" : "Coming soon",
      icon: (
        <svg aria-hidden="true" height="28" viewBox="0 0 28 28" width="28">
          <path d="M3.5 3.1 17 14 3.5 24.9V3.1Z" fill="#34A853" />
          <path d="m17 14 3.6-2.9 4.1 2.3c1 .6 1 1.4 0 2l-4.1 2.3L17 14Z" fill="#FBBC04" />
          <path d="M3.5 3.1 20.6 11 17 14 3.5 3.1Z" fill="#4285F4" />
          <path d="M3.5 24.9 20.6 17 17 14 3.5 24.9Z" fill="#EA4335" />
        </svg>
      ),
    },
    {
      href: storeLinks.appStore,
      name: "App Store",
      overline: turkish ? "Çok yakında" : "Coming soon",
      icon: (
        <svg aria-hidden="true" fill="currentColor" height="29" viewBox="0 0 24 24" width="29">
          <path d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.7c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3.1-.7s1.9.7 3.1.7c1.3 0 2.1-1.1 2.9-2.3a10 10 0 0 0 1.3-2.7 4 4 0 0 1-3-3.8ZM14.5 6.3a4 4 0 0 0 .9-2.9 4.1 4.1 0 0 0-2.7 1.4 3.8 3.8 0 0 0-1 2.8 3.4 3.4 0 0 0 2.8-1.3Z" />
        </svg>
      ),
    },
  ];

  return (
    <div aria-label={turkish ? "Uygulama mağazaları" : "App stores"} className={styles.badges}>
      {stores.map((store) => {
        const content = <><span className={styles.icon}>{store.icon}</span><span className={styles.copy}><span className={styles.overline}>{store.overline}</span><span className={styles.name}>{store.name}</span></span></>;
        return store.href
          ? <a className={styles.badge} href={store.href} key={store.name} rel="noreferrer">{content}</a>
          : <span aria-disabled="true" className={`${styles.badge} ${styles.disabled}`} key={store.name}>{content}</span>;
      })}
    </div>
  );
}
