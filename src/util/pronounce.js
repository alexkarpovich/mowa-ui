import queryString from 'query-string';

const TTS_URL = 'http://tts.baidu.com/text2audio';

export const speachAudio = ({ text, language, cuid, ctp, pdt, vol, spd }) => {
  const params = {
    tex: text,
    lan: language || 'zh',
    cuid: cuid || 'dict',
    ctp: ctp || 1,
    pdt: pdt || 30,
    vol: vol || 9,
    spd: spd || 4
  };

  return new Audio(`${TTS_URL}?${queryString.stringify(params)}`);
};
