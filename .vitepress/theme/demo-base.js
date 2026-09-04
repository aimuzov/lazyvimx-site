// Записи демо живут в ветке assets репозитория lazyvimx, а раздаёт их
// CDN: с самого GitHub они приходили с кешем в пять минут. Адрес нужен
// и конфигу (предзагрузка постера), и компонентам — поэтому отдельно.
//
// Ссылка закреплена на коммит, а не на ветку: по ветке jsDelivr держит
// файл неделю, по коммиту — год и с immutable. Хеш нужен полный, от
// сокращённого кеш снова недельный. Цена — эту строку править всякий
// раз, когда демо переснимут (docs/demo/record.sh в lazyvimx, потом
// коммит в ветку assets).
const commit = "5de843c51aec6b5d7998a6e45ce119b09f23e88f";
const path = `/gh/aimuzov/lazyvimx@${commit}/demo`;

export const demoBase = `https://cdn.jsdelivr.net${path}`;

// Общий вход jsDelivr во многих сетях отвечает через Cloudflare, а в
// России его режут — файл может не дойти. У jsDelivr есть прямые входы
// в каждую из своих сетей; этот идёт через Fastly, отдаёт те же файлы
// с тем же годовым кешем и Cloudflare не задействует.
export const demoFallback = `https://fastly.jsdelivr.net${path}`;
