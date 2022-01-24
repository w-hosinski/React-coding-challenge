import React, {useState, useEffect} from "react"
import './wallpaper.scss'

const Wallpaper = () => {
    const [picDataArr, setPicDataArr] = useState([])

    const fetchWallpaper = async() => {
        const response = await fetch("https://api.unsplash.com/photos/?client_id=MCWF9paqDNakL9OxfbhiK64aCpfjRwz86ETp6NRtY-A")
        const images = await response.json()
        return images   
    }

    const displayWallpaper = async () => {
        let data = await fetchWallpaper()
        console.log(data)
        let tempPicDataArr = []
        for(let i=0;i<9;i++) {
            tempPicDataArr.push({url: data[i].urls.regular, alt: data[i].alt_description, name: data[i].user.name, desc: data[i].description, download: data[i].links.download})
        }
        setPicDataArr([...picDataArr,...tempPicDataArr])
      }
    useEffect(() => {
        displayWallpaper()  
    },[]) 

return(<div>
    <h1>Unsplash Wallpaper Downloader</h1>
    <div className="container">
        {picDataArr.map(item => {
            return (
            <li key={item.url}><img src={item.url} width="3200" height="1800" alt={item.alt}></img>
            <p className="toolTip" id="name">{item.name}</p>
            <p className="toolTip" id="desc">{item.desc}</p>
            <a className="toolTip" id="download" href={item.download} download={item.desc+".jpg"}>Download</a>
            </li>
            )
            
        })}
    
    </div>
    <button className="loadMore" onClick={displayWallpaper}>Load More</button>
    </div>
)
}
export default Wallpaper