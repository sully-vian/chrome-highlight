// typst compile --format png --ppi 38 thumbnail.typ
#set page(width: auto, height: auto, margin: 0pt)

#let overlay = "#6"

#box({
  image("thumbnail-ai.png")
  place(
    top + right,
    dx: -5%,
    dy: 45%,
    rotate(15deg, text(
      size: 600pt,
      fill: orange,
      weight: "bold",
      font: "Impact",
      stroke: 30pt + black,
      overlay,
    )),
  )
})

