const postRepo = require('../data-access/post-repository');
const { customAlphabet, urlAlphabet } = require('nanoid');

const getPostById = async (id) => {
  const response = await postRepo.getPostById(id);
  return response;
};

const createPost = async (title, consumerId, subredditId, description) => {
  let postId;
  do {
    postId = customAlphabet(urlAlphabet, 10)();      // TODO: no need to do this, as very less chance of conflicting
    console.log(postId);
  } while (await postRepo.isPostWithSameIdPresent(postId));
  console.log(postId);
  const slug = createSlugFromTitle(title);
  console.log(slug);
  const response = await postRepo.createPost(
    postId,
    title,
    consumerId,
    subredditId,
    slug,
    description
  );
  return response;
};

const updatePost = async (postId, description) => {
  const response = await postRepo.updatePost(postId, description);
  return response;
};

const deletePost = async (postId) => {
  const response = await postRepo.deletePost(postId);
  return response;
};

const createSlugFromTitle = (title) => {
  title = title.toLowerCase();
  const titleLength = title.length;
  const maxLengthOfSlug = Math.min(50, titleLength);
  let pointer1 = 0,
    pointer2 = 0;
  let slug = '';
  while (pointer1 < maxLengthOfSlug && pointer2 < maxLengthOfSlug) {
    let word = '';
    while (pointer2 < titleLength && title[pointer2] !== ' ') {
      if (isUrlSafe(title[pointer2])) {
        word += title[pointer2];
      }
      pointer2++;
    }
    if (word.length + slug.length > maxLengthOfSlug) {
      return slug;
    } else if (slug.length > 0 && word.length > 0) {
      slug += '_';
    }
    slug += word;
    word = '';
    pointer2++;
    pointer1 = pointer2;
  }
  return slug;
};

const isUrlSafe = (character) => {
  const asciiValue = getAsciiValue(character);
  return (
    (asciiValue >= 48 && asciiValue <= 57) ||
    (asciiValue >= 65 && asciiValue <= 90) ||
    (asciiValue >= 97 && asciiValue <= 122)
  );
};

const getAsciiValue = (character) => {
  return character.charCodeAt(0);
};

module.exports = {
  getPostById,
  updatePost,
  createPost,
  deletePost,
};
