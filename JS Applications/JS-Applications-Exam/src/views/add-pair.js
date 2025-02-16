import { addShoe } from "../api/data.js"
import { html } from "../lib.js"

const createPostTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Add item</h2>
      <form @submit=${onSubmit} class="create-form">
        <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
        <input type="text" name="model" id="shoe-model" placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
        />
        <input type="text" name="value" id="shoe-value" placeholder="Value" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`
export function createPage(ctx) {
  ctx.render(createPostTemplate(onSubmit))

  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const brand = formData.get("brand").trim()
    const model = formData.get("model").trim()
    const imageUrl = formData.get("imageUrl").trim()
    const release = formData.get("release").trim()
    const designer = formData.get("designer").trim()
    const value = formData.get("value").trim()

    const shoe = { brand, model, imageUrl, release, designer, value }

    if (Object.values(shoe).some((x) => !x)) {
      return alert("All fields are required")
    }

    await addShoe({
      brand,
      model,
      imageUrl,
      release,
      designer,
      value,
    })
    ctx.page.redirect("/dashboard")
  }
}
