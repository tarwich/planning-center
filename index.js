// @ts-check
const { promisify } = require('util');
const https = require('https');
const querystring = require('querystring');
const { openSync, writeSync } = require('fs');

const { APPLICATION_ID, SECRET } = process.env;

const formatNumber = new Intl.NumberFormat(undefined).format;

/**
 *
 * @param {Parameters<https['request']>[0]} url
 * @param {Parameters<https['request']>[1]} options
 *
 * @template T
 *
 * @return {Promise<T>}
 */
const request = async (url, options) => {
  return new Promise((resolve, reject) => {
    https
      .request(url, options, (response) => {
        /** @type {string[]} */
        const buffer = [];

        response.on('data', (chunk) => {
          buffer.push(chunk);
        });
        response.on('end', () => {
          const json = JSON.parse(buffer.join(''));
          return resolve(json);
        });
      })
      .end();
  });
};

const api = new (class {
  constructor() {
    this.base = 'https://api.planningcenteronline.com';
    this.auth = `${APPLICATION_ID}:${SECRET}`;
  }

  /**
   * @param {string} slug
   * @param {Record<string, any>} query
   *
   * @template T
   *
   * @returns {Promise<PlanningCenterResponse<T>>}
   */
  get(slug, query = {}) {
    return request(`${this.base}/${slug}?${querystring.stringify(query)}`, {
      auth: this.auth,
    });
  }
})();

async function main() {
  const file = openSync('./out.local.csv', 'w');

  /** @type {PlanningCenterResponse<Song[]>} */
  let response = await api.get('/services/v2/songs');
  const songs = response.data;

  while (response.meta.next) {
    console.log(`Songs found: ${formatNumber(songs.length)}`);
    // Allow the API to breathe
    await new Promise((resolve) => setTimeout(resolve, 200));
    response = await api.get('/services/v2/songs', response.meta.next);
    songs.push(...response.data);
  }

  console.log(`Songs found: ${formatNumber(songs.length)}`);
  let i = 0;

  for (const song of songs) {
    console.log(
      `Getting arrangements (song ${formatNumber(++i)} of ${formatNumber(
        songs.length
      )})`
    );
    // Allow the API to breathe
    await new Promise((resolve) => setTimeout(resolve, 500));

    /** @type {PlanningCenterResponse<Arrangement[]>} */
    const arrangements = await api.get(
      `/services/v2/songs/${song.id}/arrangements`
    );

    for (const arrangement of arrangements.data) {
      console.log(
        `Getting attachments (arrangement ${arrangement.attributes.name})`
      );

      /** @type {PlanningCenterResponse<Attachment[]>} */
      const attachments = await api.get(
        `/services/v2/songs/${song.id}/arrangements/${arrangement.id}/attachments`
      );

      for (const attachment of attachments.data) {
        if (attachment.attributes.filetype === 'audio') {
          writeSync(
            file,
            `${song.id},"${song.attributes.title}",${arrangement.id},"${arrangement.attributes.name}",${attachment.id},${attachment.attributes.file_size},"${attachment.attributes.display_name}",${attachment.attributes.url}\n`
          );
        }
      }
    }
  }
}

main().catch(console.error);
