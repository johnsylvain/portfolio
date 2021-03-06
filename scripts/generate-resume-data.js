const ApolloClient = require('apollo-boost');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const client = new ApolloClient.default({
  uri: 'https://api.sylvain.win',
  fetch
});

const GET_RESUME_DATA = ApolloClient.gql`
  query {
    resume {
      name
      occupation
      profiles {
        github
        linkedin
        spotify
      }
      businessCard
      education {
        school
        graduationDate
        study {
          major
          minor
        }
      }
      experience {
        company
        position
        date
        description
      }
      projects {
        title
        description
        links {
          docs
          demo
          github
        }
      }
      skills {
        languages
        frameworksAndLibraries
        webTooling
        database
      }
    }
  }
`;

const omitDeep = (obj, key) => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach(i => {
    if (i !== key && obj[i]) {
      const val = obj[i];
      if (val instanceof Date) newObj[i] = val;
      else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === 'object' && val !== null)
        newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
};

const omitDeepArrayWalk = (arr, key) => {
  return arr.map(val => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    else if (typeof val === 'object') return omitDeep(val, key);
    return val;
  });
};

(async () => {
  try {
    console.log('Fetching resume data');
    const response = await client.query({
      query: GET_RESUME_DATA
    });

    const sanitizedResponse = omitDeep(response.data.resume, '__typename');

    const header = [
      'This file is automatically generated',
      './scripts/generate-resume-data.js'
    ]
      .map(comment => `// ${comment}`)
      .join('\n');

    const content = `${header}\n\nexport default ${JSON.stringify(
      sanitizedResponse,
      null,
      2
    )}`;

    fs.writeFileSync(path.join(__dirname, '../src/data/resume.js'), content);
  } catch (err) {
    process.exit(1);
  }
})();
