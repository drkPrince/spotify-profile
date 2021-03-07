
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
	useQuery("basics", getUserData)


	if(isError){
		return <div>
				Something went wrong. 
				<a href="http://localhost:5000/login">Please try again.</a>	
			</div>
	}


	return (
		<>	
			<div className="flex justify-end pt-8">
				<div className='flex items-center'>
					<div className='flex items-center mr-4 text-gray-600 hover:text-gray-400 cursor-pointer'>
						<svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="21"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"/></svg>
						<a target='blank' className='ml-2 text-sm' href="https://github.com/drkPrince/spotify-profile">Github</a>
					</div>
					<button onClick={logOut} className='text-gray-600 hover:text-gray-400'>
						<div className='flex items-center'>
							<svg xmlns="http://www.w3.org/2000/svg" className='fill-current' viewBox="0 0 24 24" width="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z"/></svg>
							<h2 className='ml-2 text-sm'>Logout</h2>
						</div>
					</button>
				</div>
			</div>
			

			{/* Hero */}
			{data ? 
				<main className='pb-12'>
					<div className='pt-12'>
						<h1 className='text-center text-3xl sm:text-4xl lg:text-4xl'>
							<span className='text-gray-500'>Hi, </span>
							<span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text'>{data[0].data.display_name}.</span>
							<span>👋</span>
						</h1>
					</div>
					
					
					{/* Fave Artists */}
					
					<div className='mt-10 md:mt-24'>
						<div className="flex justify-start items-center">
							<h2 className='text-xl lg:text-2xl heading'>Artists you love the most</h2>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-8 gap-y-2">
							{data[1].data.items.map(artist => 
								<Link to={`artist/${artist.id}`} key={artist.id}>
									<SingleCard imageURL={artist.images[1].url} itemName={artist.name} key={artist.name}/>
								</Link>
							)}
							<Link to='/artist' className='bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:text-gray-200 rounded'>
								<h2>See More</h2>
							</Link>
						</div>
					</div>
					
					{/* Fave Tracks */}
					
					<div className='mt-10 md:mt-20'>
						<div className="flex justify-start items-center">
							<h2 className='text-xl lg:text-2xl heading'>Your most favourite tracks of all time</h2>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-8  gap-y-2">
							{data[2].data.items.map(track => 
								<Link to={`track/${track.id}`} key={track.id}>
									<DoubleCard imageURL={track.album.images[1].url} itemName={track.name} subItem={track.artists} key={track.name}/>
								</Link>
							)}
							<Link to='/track'  className='bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:text-gray-200 rounded'>
								<h2>See More</h2>
							</Link>
						</div>
					</div>
					
					
					{/* Recently Played */}
					
					<div className='mt-10 md:mt-20 w-full'>
						<h2 className='text-xl lg:text-2xl heading'>Recently played tracks</h2>
						<div className='mt-1 w-full'>
							<div className="table flex justify-between w-full">
					
								<div className="w-3/4 lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
									<div className='w-12/12 lg:w-7/12 text-left'>TRACK</div>
									<div className='w-4/12 hidden lg:block text-left'>ALBUM</div>
									<div className='w-1/12 hidden lg:block text-left'>DURATION</div>
								</div>
					
								<div className="mt-6">
									{data[5].data.items.map(song => 
										<div className="lg:flex text-gray-400 justify-between" key={song.played_at}>
											<div className='lg:w-7/12 truncate overflow-x-hidden'>
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



<div className='pt-12'>
	<div>
		<div className='flex justify-center items-center'>
			<div className='rounded-full w-20 h-20 lg:w-32 lg:h-32 rounded-full overflow-hidden'>
				<img src={data[0].data.images[0].url} alt="user" />
			</div>
		</div>
		<h1 className='text-center mt-7 text-3xl sm:text-4xl lg:text-5xl ml-6 '>
			<span className='text-gray-500'>Welcome, </span>
			<span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text'>{data[0].data.display_name}.</span>
		</h1>
	</div>
</div>




 */
