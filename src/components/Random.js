import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`

export default function Random() {
	const [search, setSearch] = useState('')
	const [gif, setGif] = useState('')
	const [gifTitle, setGifTitle] = useState('')

	const fetchGIF = async (query) => {
		try {
			const { data } = await axios.get(query ? `${url}&tag=${query}` : `${url}`)
			const gif_url = data.data.images.downsized_large.url
			const gif_title = data.data.title

			setGif(gif_url)
			setGifTitle(`GIF Title: ${gif_title}`)
		} catch (err) {
			console.error(err)
			setGifTitle(`No GIFs found for ${search}`)
		}
	}

	useEffect(() => {
		fetchGIF()
		// eslint-disable-next-line
	}, [])

	return (
		<div className="random-container">
			<h2 className="subheading">{search ? `Random ${search} GIF` : `Random GIF`}</h2>
			<div className="search-container">
				<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cat.." />
				<div className="button-container">
					<button className="btn search-btn" onClick={() => fetchGIF(search)}>
						Search
					</button>
					<button className="btn random-btn" onClick={fetchGIF}>
						Random
					</button>
				</div>
			</div>
			{gifTitle && <h1 className="gif-title">{gifTitle}</h1>}
			<img src={gif} alt="Random GIF" width="650" />
		</div>
	)
}
