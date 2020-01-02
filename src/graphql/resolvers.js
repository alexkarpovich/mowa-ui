import { SET_FRAGMENT, TERMS } from './schemas/set';
import { ME_QUERY, SETS_QUERY } from './schemas/account';
import { TERM_FRAGMENT } from './schemas/term';

export default {
  Mutation: {
    unshiftTerm: (_, { setId, term }, { cache }) => {
      const params = { query: TERMS, variables: { ids: [setId] } };
      let data = cache.readQuery(params);
      data.terms.unshift(term);
      cache.writeQuery({ ...params, data });

      data = cache.readFragment({ id: setId, fragment: SET_FRAGMENT });
      data.count++;
      cache.writeFragment({ id: setId, fragment: SET_FRAGMENT, data });
    },
    unshiftProfile: (_, { profile }, { cache }) => {
      const data = cache.readQuery({ query: ME_QUERY });
      data.me.profiles.unshift(profile);
      cache.writeData({ query: ME_QUERY, data });
    },
    activateProfile: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: ME_QUERY });
      data.me.profiles = data.me.profiles.map(profile => {
        profile.active = profile.id === id;

        return profile;
      });
      cache.writeData({ query: ME_QUERY, data });
    },
    unshiftSet: (_, { set }, { cache }) => {
      const data = cache.readQuery({ query: SETS_QUERY });
      data.sets.unshift(set);
      cache.writeData({ query: SETS_QUERY, data });
    },
    addTranslation: (_, { termId, translation }, { cache }) => {
      let data = cache.readFragment({ id: termId, fragment: TERM_FRAGMENT });
      data.translations.push(translation);

      if (translation.transcription) {
        if (!data.transcription) {
          data.transcription = translation.transcription;
        } else {
          let transcriptions = data.transcription.split(', ');

          if (transcriptions.indexOf(translation.transcription) === -1) {
            transcriptions.push(translation.transcription);
            data.transcription = transcriptions.join(', ');
          }
        }
      }

      cache.writeFragment({ id: termId, fragment: TERM_FRAGMENT, data });
    }
  }
};
