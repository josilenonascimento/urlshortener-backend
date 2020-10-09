const yup = require('yup');
const urls = require('../models/Url.model');
const { nanoid } = require('nanoid');

const schema = yup.object().shape({
  url: yup.string().trim().url().required(),
  slug: yup.string().trim().matches(/[\w\-]/i, { excludeEmptyString: true }).notRequired()
});

module.exports = {
  async store(request, response, next) {
    try {
      let { url, slug } = request.body;

      let data = { url, slug };

      await schema.validate(data);

      if (!slug) {
        data.slug = nanoid(5);
      } else {
        if (await urls.findOne({ slug })) {
          throw new Error('Slug in use');
        }
      }
      
      const created = await urls.insert(data);
      return response.json(created);

    } catch (error) {
      next(error)
    }
  },

  async show(request, response, next) {
    try {
      const { slug } = request.params;

      const url = await urls.findOne({slug});

      if (url) {
        return response.redirect(url.url);
      } else {
        return response.redirect('/?error=Not+found');
      }

    } catch (error) {
      next(error);
    }
  }
};