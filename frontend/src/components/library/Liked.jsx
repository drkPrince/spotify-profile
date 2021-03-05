import {useState, useEffect} from 'react'
import {getLikedSongs, headers} from '../../spotify-api'
import {TrackItem, simplifyDate} from '../utils'
import {Link} from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import axios from 'axios'


const Liked = () => {
	const [faves, setFaves] = useState(null)
	const [next, setNext] = useState(null)

	const {ref, inView} = useInView()

	useEffect(() => 
	{
		getLikedSongs().then(res => {
			setNext(res.data.next)
			setFaves(res.data.items)
		})
	}, [])


	useEffect(() => {
		if(inView && next)
		{
			axios.get(next, {headers})
			.then(res => {
				const newFaves = faves.concat(res.data.items)
				setFaves(newFaves)
				setNext(res.data.next)
			})
		}
	}, [inView, next, faves])


	return (
		<div>
			<h3 className='text-2xl heading'>Liked Songs</h3>
			{faves ? 
				<div className='mt-5'>
					<div className="">
						<div className=" flex-col flex">

							<div className=" flex text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom" >
								<div className="w-12/12 lg:w-7/12 ">TRACK</div>
								<div className="hidden lg:block w-3/12 text-left ">ALBUM</div>
								<div className="hidden lg:block w-2/12 text-left ">DATE ADDED</div>
							</div>

							{faves.map(song => 
								<div className=" flex text-gray-500" key={song.id}>
									<div className="w-12/12 lg:w-7/12 truncate">
										<Link to={`/track/${song.track.id}`}>
											<TrackItem songName={song.track.name} songArtists={song.track.artists} songAlbum={song.track.album.name} picURL={song.track.album.images[1].url}/>
										</Link>
									</div>
									<div className="hidden lg:block w-3/12 text-left pr-8 truncate">{song.track.album.name}</div>
									<div className="hidden lg:block w-2/12 text-left">{simplifyDate(song.added_at)}</div>
								</div>
							)}
						</div>
					</div>
					{next && <div ref={ref} className='loader'></div>}
				</div>
			: <div className='loader'>Loading, Please Wait</div>}
			
		</div>
	)
}

export default Liked