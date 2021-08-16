

export const cleaner = (arr) => 
{
	const array = arr.map(solo => solo.name)
	return array.join(', ')
}


export const genreCleaner = (ar) => {
	const capped = ar.map(gen => gen[0].toUpperCase()+gen.slice(1))
	return capped.slice(0, 3).join(', ')
}


export const SingleCard = ({imageURL, itemName}) => {
	return (
		<div className='bg-card pb-1.5 mr-3 md:mr-6 mt-4 w-36 md:w-40 shadow-2xl rounded-sm transition-transform duration-300 transform hover:scale-105'>
			<div className='px-4 w-full'>
				<div className='image pt-4 opacity-75'>
					<img src={imageURL} alt="" className='w-32 h-36 object-cover'/>
				</div>
				<div className='w-full'>
					<h3 className='mt-1 text-gray-400 truncate'>{itemName}</h3>
				</div>
			</div>
		</div>
	)
}


export const DoubleCard = ({imageURL, subItem, itemName}) => 
{
	return (
		<div className='bg-card pb-1.5 mr-3 md:mr-6 mt-4 w-36 md:w-40 shadow-2xl rounded-sm transition-transform duration-200 transform hover:scale-105'>
			<div className='px-4'>
				<div className='image pt-4 opacity-75'>
					<img src={imageURL} alt="" className='w-32 h-32 object-cover'/>
				</div>
				<div className='w-32'>
					<h3 className='mt-1 text-gray-400 truncate' >{itemName}</h3>
					<div className='text-sm text-gray-700 mb-2'>
						{Array.isArray(subItem) ? 
							<h3 className='truncate'>{cleaner(subItem)}</h3> 
							: 
							<h3 className='truncate'>{subItem}</h3>}
					</div>
				</div>
			</div>
		</div>
	)
}


export const TrackItem = ({songName, songArtists, picURL}) => {
	return (
		<div className='w-full flex items-start mb-7 w-full pr-8 truncate overflow-hidden'>
			<div className='hidden sm:block sm:w-12 sm:h-12 overflow-hidden rounded-full'>
				<img src={picURL} alt="track" className='object-cover'/>
			</div>
			<div className='ml-4 truncate'>
				<h4 className='text-gray-400 hover:text-white truncate' >{songName}</h4>
				{Array.isArray(songArtists) && songArtists ?
					<h3 className='text-sm text-gray-700 truncate'>{cleaner(songArtists)}</h3>
					:
					<h3 className='text-sm text-gray-700 truncate' >{songArtists}</h3>
				}
				
			</div>
		</div>

	)
}




export const convertMS = ( milliseconds ) =>
{
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}




export const simplifyDate = (date) => 
{
	return date.split('T')[0]
}

//style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
