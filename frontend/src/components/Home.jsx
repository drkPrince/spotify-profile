
import {Link} from 'react-router-dom'
import {useQuery} from 'react-query'

import {SingleCard, DoubleCard, TrackItem, convertMS} from './utils'
import {getUser, getUsersTop5Artists, getFollowing, getUsersTop5Tracks, getPlaylists, getRecentlyPlayed, logOut} from '../spotify-api'


const getUserData = async() => 	{
	try{
		const user = await getUser()	
		const topArtists =  await getUsersTop5Artists()
		const topTracks =  await getUsersTop5Tracks()
		const following = await getFollowing()
		const playlists = await getPlaylists()
		const recentlyPlayed = await getRecentlyPlayed()

		return Promise.all([user, topArtists, topTracks, following, playlists, recentlyPlayed])
	}

	catch(e){
		console.log(e)
	}
}


const Home = () => 
{

	const {data, isError} = useQuery("basics", getUserData)
	const res = useQuery("basics", getUserData)

	console.log(res)

	if(isError){
		return <div>
				Something went wrong. Please try again.
				<a href="http://localhost:5000/login">Login</a>	
			</div>
	}

	return (
		<>	
			<div className="flex justify-end pt-8">
				<button onClick={logOut} className='text-gray-600 hover:text-gray-400'>
					<div className='flex items-center'>
						<svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z"/></svg>
						<h2 className='ml-2 text-sm'>Log out</h2>
					</div>
				</button>
			</div>
			

			{/* Hero */}
			{data ? 
				<main>
					<div className='py-12'>
						<div className=''>
							<div className='flex justify-center items-center'>
								<div className='rounded-full w-20 h-20 lg:w-32 lg:h-32 rounded-full overflow-hidden'>
									<img src={data[0].data.images[0].url} alt="user" />
								</div>
							</div>
								<h1 className=' text-center mt-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text text-3xl sm:text-4xl lg:text-5xl ml-6 '>Welcome, {data[0].data.display_name}.</h1>
						</div>
					</div>
					
					
					{/* Fave Artists */}
					
					<div className='mt-10 md:mt-20'>
						<div className="flex justify-start items-center">
							<h2 className='text-xl lg:text-2xl heading'>Artists you Love The Most</h2>
						</div>
						<div className="flex justify-start lg:justify-between flex-wrap">
							{data[1].data.items.map(artist => 
								<Link to={`artist/${artist.id}`} key={artist.id} className='hover:fil'>
									<SingleCard imageURL={artist.images[1].url} itemName={artist.name} key={artist.name}/>
								</Link>
							)}
							<Link to='/artist' className='bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:bg-gray-700'>
								<h2>See More</h2>
							</Link>
						</div>
					</div>
					
					{/* Fave Tracks */}
					
					<div className='mt-10 md:mt-20'>
						<div className="flex justify-start items-center">
							<h2 className='text-xl lg:text-2xl heading'>Your Top Tracks</h2>
						</div>
						<div className="flex justify-start lg:justify-between flex-wrap">
							{data[2].data.items.map(track => 
								<Link to={`track/${track.id}`} key={track.id}>
									<DoubleCard imageURL={track.album.images[1].url} itemName={track.name} subItem={track.artists} key={track.name}/>
								</Link>
							)}
							<Link to='/track'  className='bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:bg-gray-700'>
								<h2>See More</h2>
							</Link>
						</div>
					</div>
					
					
					{/* Recently Played */}
					
					<div className='mt-10 md:mt-20 w-full'>
						<h2 className='text-xl lg:text-2xl heading'>Recently played Tracks</h2>
						<div className='mt-1 w-full'>
							<div className="table flex justify-between w-full">
					
								<div className="flex text-gray-700 text-xs lg:text-sm mb-4 tracking-wider sticky top-0 pt-8 bg-black w-full justify-between border-bottom">
									<div className='w-12/12 lg:w-5/12 text-left'>TRACK</div>
									<div className='w-4/12 hidden lg:block text-left '>ALBUM</div>
									<div className='w-1/12 text-left hidden lg:block'>DURATION</div>
								</div>
					
								<div className="mt-6">
									{data[5].data.items.map(song => 
										<div className="row flex text-gray-400 justify-between" key={song.played_at}>
											<div className='w-12/12 lg:w-5/12'>
												<Link to={`track/${song.track.id}`}>
													<TrackItem picURL={song.track.album.images[2].url} songName={song.track.name} songArtists={song.track.artists}/>
												</Link>
											</div>
											<div className='w-4/12 hidden lg:block pr-4'>{song.track.album.name}</div>
											<div className='w-1/12 hidden lg:block'>{convertMS(song.track.duration_ms)}</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</main>
				:
				<div className='loader w-full h-full' />}
		</>
	)
}

export default Home



/* 

<div className='flex justify-start mt-12'>
	<div className='flex mt-10 space-x-12'>
		<div className='flex flex-col'>
			<h2 className='text-xs text-gray-400 tracking-wider'>FOLLOWERS</h2>
			<h3 className='text-4xl text-spotify'>{data[0].data.followers.total}</h3>
		</div>
		<div className='flex flex-col'>
			<h2 className='text-xs text-gray-400 tracking-wider'>FOLLOWING</h2>
			<h3 className='text-4xl text-spotify'>{data[3].data.artists.total}</h3>
		</div>
		<div className='flex flex-col'>
			<h2 className='text-xs text-gray-400 tracking-wider'>PLAYLISTS</h2>
			<h3 className='text-4xl text-spotify'>{data[4].data.total}</h3>
		</div>
	</div>	
</div>
 */
