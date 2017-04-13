package main

import (
	"github.com/fogleman/gg"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"github.com/nu7hatch/gouuid"
	"log"
	"fmt"
	//"net/http"
)

// model
type Poem struct {
	Title string `json:"title" binding:"required"`
	Body []string `json:"body" binding:"required"`
	Author string `json:"author" binding:"required"`
}

func main() {
	// Create a gin router with default middleware
	// logger and recovery
	router := gin.Default()

	// Use middleware to serve static
	router.Use(static.Serve("/", static.LocalFile("./frontend/dist", true)))
	router.Use(static.Serve("/download", static.LocalFile("./output", true)))

	// Routes
	api := router.Group("/api/v1")
	{
		api.POST("/card", func(c *gin.Context) {
			// Gather data from post form
			var poem Poem
			c.BindJSON(&poem)

			// Read image
			im, err := gg.LoadImage("frames/f1.png")
			if err != nil {
				log.Fatal(err)
			}

			// Create a draw context with dimension equal the loaded image
			dc := gg.NewContextForImage(im)

			// Set text color
			dc.SetRGB255(220, 94, 94)

			// Load font face and set font size is 44 pt
			if err := dc.LoadFontFace("fonts/bucthu.ttf", 44); err != nil {
				panic(err)
			}

			// Draw text
			width, height := float64(dc.Width())/1.8, float64(dc.Height())/3
			sep := "------------o0o------------"
			dc.DrawStringAnchored(poem.Title, width, height, 0.5, 0.5)
			for _, line := range poem.Body {
				height += 42
				dc.DrawStringAnchored(line, width, height, 0.5, 0.5)
			}
			dc.DrawStringAnchored(sep, width, height + 42, 0.5, 0.5)
			dc.DrawStringAnchored(poem.Author, width + 200, height + 84, 0.5, 0.5)

			// Draw image to context
			dc.DrawImage(im, 0, 0)
			dc.Clip()

			// Save file
			u4, err := uuid.NewV4()
			if err != nil {
				panic(err)
			}
			fileName := fmt.Sprintf("%s.png", u4)
			dc.SavePNG("output/" + fileName)

			// Response json data to client
			c.JSON(200, gin.H{
				"data": poem,
				"fileId": fmt.Sprintf("%s", u4),
			})

		})
	}

	// Run server
	router.Run(":8899")
}
