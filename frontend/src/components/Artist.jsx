import  {useEffect, useState} from 'react'
import {useParams, Link, Route} from 'react-router-dom'
import { getArtist, getArtistsTopTracks, getArtistsAlbums, getArtistsRelatedArtists, isArtistFollowedByUser, followArtist, unfollowArtist } from '../spotify-api'
import { TrackItem, SingleCard, convertMS } from './utils'
import Album from './Album'


const Artist = () => 
{
	return (
		<div className='py-24'>
			<Route exact path='/artist/:id'>
				<ArtistInfo />
			</Route>

			<Route path='/artist/:id/album/:id'>
				<Album />
			</Route>
		</div>
	)
}



const ArtistInfo = () => {
	const {id} = useParams()

	const [basicInfo, setBasicInfo] = useState(null)
	const [topTracks, setTopTracks] = useState(null)
	const [albums, setAlbums] = useState(null)
	const [related, setRelated] = useState(null)
	const [followed, setFollowed] = useState(null)

	const ualbums = new Set()

	const newAlbums = albums && albums.items.map(album => {
		if(ualbums.has(album.name)) return null
		else {
			ualbums.add(album.name)
			return album
		}	
	})

	
	useEffect(() => {
		getArtist(id).then(res => setBasicInfo(res.data))
		getArtistsTopTracks(id).then(res => setTopTracks(res.data.tracks))
		getArtistsAlbums(id).then(res => setAlbums(res.data))
		getArtistsRelatedArtists(id).then(res => setRelated(res.data.artists))
		window.scrollTo(0, 0)
		isArtistFollowedByUser(id).then(res => setFollowed(res.data[0]))
	}, [id])

	const follow = () => 
	{
		setFollowed(!followed)
		followArtist(id).then(res => console.log('followed!'))
	}

	const unfollow = () => 
	{
		setFollowed(!followed)
		unfollowArtist(id).then(res => console.log('UNfollowed!'))
	}
	return (
		<div>
			{basicInfo && topTracks && albums && newAlbums && related ? 
				<div>
					<div className='flex flex-col justify-center'>
						<div className='w-40 h-40 rounded-full flex justify-center items-center overflow-hidden mx-auto '>
							<img src={basicInfo.images[1].url} alt="artist" className='object-cover'/> 
						</div>
						<h1 className='text-white text-2xl sm:text-3xl lg:text-4xl text-center mt-3'>{basicInfo.name}</h1>
						<div className='flex space-x-8 mt-6 w-full justify-center items-center'>
							<div>
								<h3 className='text-gray-600 text-xs tracking-wider'>FOLLOWERS</h3>
								<h4 className='text-spotify text-base lg:text-2xl'>{basicInfo.followers.total.toLocaleString()}</h4>
							</div>
							<div className=''>
								<h3 className='text-gray-600 text-xs tracking-wider'>POPULARITY</h3>
								<h4 className='text-spotify text-base lg:text-2xl'>{basicInfo.popularity}</h4>
							</div>
						</div>


						{followed===undefined ? null :
							<div className='mt-4 cursor-pointer mx-auto'>
								{followed ? 
									<h3 onClick={unfollow} className=' rounded-full text-gray-400 inline-block text-sm px-3 py-1 border border-red-800 hover:bg-red-800'>Unfollow</h3> : 
									<h3 onClick={follow} className=' rounded-full inline-block text-white text-sm px-3 py-1 bg-spotify transform transition-all duration-300 hover:scale-110'>Follow</h3>}
							</div>
						}
					</div>

					<div className='mt-20'>
						<h2 className='text-2xl heading mb-1'>Top Tracks Of {basicInfo.name} </h2>

						<div className="table flex justify-between w-full">
							<div className="w-4/4 lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
									<div className='w-12/12 lg:w-7/12 text-left'>TRACK</div>
									<div className='w-4/12 hidden lg:block text-left'>ALBUM</div>
									<div className='w-1/12 hidden lg:block text-left'>DURATION</div>
								</div>
					

							{topTracks.map(song => 
								<div className="lg:flex text-gray-400 justify-between w-full" key={song.played_at}>
									<div className="w-12/12 lg:w-7/12 truncate">
										<Link to={`/track/${song.id}`}>
											<TrackItem songName={song.name} songArtists={song.artists} songAlbum={song.album.name} picURL={song.album.images[1].url}/>
										</Link>
									</div>
									<div className='w-4/12 hidden lg:block pr-4'>{song.album.name}</div>
									<div className='w-1/12 hidden lg:block'>{convertMS(song.duration_ms)}</div>
								</div>
							)}

						</div>
					</div>

					<div className='mt-20'>
						<h3 className='text-2xl heading mb-1'>Latest Albums</h3>
						<div className="grid grid-cols-2 md:grid-cols-5">
							{newAlbums.slice(0, 5).map(album => 
								{	
									if(album)
									{
										return (
											<Link to={`/artist/${id}/album/${album.id}`} key={album.id}>
												<SingleCard imageURL={album.images[1].url} itemName={album.name}/>
											</Link>)
									}

									else return null
								}
							)}
						</div>
					</div>

					<div className='mt-24'>
						<h3 className='text-2xl heading mb-1'>You will also like</h3>
						<div className="grid grid-cols-2 md:grid-cols-5">
							{
								related.slice(0, 5).map(relatedArtist => 
									<Link to={`/artist/${relatedArtist.id}`} key={relatedArtist.id}>
										<SingleCard imageURL={relatedArtist.images[1].url} itemName={relatedArtist.name}/>
									</Link>
								)
							}
						</div>
					</div>

				</div>
				:
				<div className='loader' />
			}
			
		</div>
	)
}

export default Artist
