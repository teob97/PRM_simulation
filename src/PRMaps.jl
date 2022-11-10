module PRMaps

import Stripeline as Sl
using Healpix, Plots
export Setup
export makeIdealMap, makeErroredMap, makeMapPlots, makeErroredMap_old
export getPixelIndex

Base.@kwdef struct Setup
    τ_s :: Float64 = 0.0
    times :: StepRangeLen
    NSIDE :: Int32 = 0
end

function add2pixel!(map, sky_value, pixel_idx, pixel_hits)
    map.pixels[pixel_idx] += sky_value
    pixel_hits[pixel_idx] += 1
end

"""
    getPixelIndex(
        cam_ang :: Stripeline.CameraAngles,
        telescope_ang :: Stripeline.TelescopeAngles,
        signal :: Healpix.HealpixMap,
        setup :: PRMaps.Setup
    )

This function return the indeces of the pixel seeing by the telescope given:

    - `cam_ang :: Stripeline.CameraAngles` : encoding the boresight directions of the detector;
    - `telescope_ang :: Stripeline.TelescopeAngles` :  encoding the non idealities angles of the telescope;
    - `signal :: Healpix.HealpixMap` : the input map that the telescope is going to observe;
    - `setup :: PRMaps.Setup` : encoding the information about period of observation and resolution.

"""
function getPixelIndex(
    wheelfunction,
    cam_ang :: Sl.CameraAngles,
    telescope_ang :: Union{Nothing, Sl.TelescopeAngles},
    signal :: HealpixMap,
    setup :: Setup
    )
    
    pixel_index = Array{Int}(undef, length(setup.times))
    dirs = Array{Float64}(undef, 1, 2)
    psi = Array{Float64}(undef, 1)
    for i in 1:length(setup.times)
    dirs = Array{Float64}(undef, 1, 2)
        Sl.genpointings!(wheelfunction, cam_ang, i, dirs, psi; telescope_ang = telescope_ang)
        pixel_index[i] = ang2pix(signal, dirs[1], dirs[2])
    end
    pixel_index
end

function fillMap!(
    map :: HealpixMap,
    wheelfunction,
    cam_ang :: Sl.CameraAngles,
    telescope_ang :: Sl.TelescopeAngles,
    signal :: HealpixMap,
    setup :: Setup,
    hits :: Array{Int32},
    )
    
    pixbuf = Array{Int}(undef, 4)
    weightbuf = Array{Float64}(undef, 4)
    dirs = Array{Float64}(undef, 1, 2)
    psi = Array{Float64}(undef, 1)
    
    for t in setup.times
        
        Sl.genpointings!(wheelfunction, cam_ang, t, dirs, psi)
        pixel_index_ideal = ang2pix(signal, dirs[1], dirs[2])
        
        Sl.genpointings!(wheelfunction, cam_ang, t, dirs, psi; telescope_ang = telescope_ang)

        sky_value = Healpix.interpolate(signal, dirs[1], dirs[2], pixbuf, weightbuf)

        add2pixel!(map, sky_value, pixel_index_ideal, hits)

    end
end

function fillTOD!(
    tod,
    wheelfunction,
    cam_ang :: Sl.CameraAngles,
    telescope_ang :: Sl.TelescopeAngles,
    signal :: HealpixMap,
    setup :: Setup,
    )

    pixbuf = Array{Int}(undef, 4)
    weightbuf = Array{Float64}(undef, 4)
    dirs = Array{Float64}(undef, 1, 2)
    psi = Array{Float64}(undef, 1)
    
    for (indx, t) in enumerate(setup.times)
        
        Sl.genpointings!(wheelfunction, cam_ang, t, dirs, psi; telescope_ang = telescope_ang)

        sky_value = Healpix.interpolate(signal, dirs[1], dirs[2], pixbuf, weightbuf)

        tod[indx] = sky_value

    end
end

function makeErroredMap(
    cam_ang :: Sl.CameraAngles,
    telescope_ang :: Sl.TelescopeAngles,
    signal :: HealpixMap,
    setup :: Setup
    )

    map = HealpixMap{Float64, RingOrder}(setup.NSIDE)
    hits = zeros(Int32, 12*setup.NSIDE*setup.NSIDE)
    wheelfunction = x -> (0.0, deg2rad(20.0), Sl.timetorotang(x, setup.τ_s*60.))

    fillMap!(map, wheelfunction, cam_ang, telescope_ang, signal, setup, hits)

    map.pixels = map.pixels ./ hits
    map
end


"""
    makeErroredMap_old(
        cam_ang :: Sl.CameraAngles, 
        telescope_angles,
        signal :: Healpix.HealpixMap,
        setup :: Setup
    )

Generate a Healpix map using a telescope model that takes into account of
the non idealities to generate the pointing direction. The observed values instead are
calculated taking into account the ideal pointing directions. The result is a map affected
by an error due to the non idealities of the system.

"""
function makeErroredMap_old(
    cam_ang :: Sl.CameraAngles,
    telescope_ang :: Sl.TelescopeAngles,
    signal :: HealpixMap,
    setup :: Setup   
)
    tod = Array{Float64}(undef, length(setup.times))

    wheelfunction = x -> (0.0, deg2rad(20.0), Sl.timetorotang(x, setup.τ_s*60.))

    ideal_indx = getPixelIndex(wheelfunction ,cam_ang, nothing, signal, setup)

    fillTOD!(tod, wheelfunction, cam_ang, telescope_ang, signal, setup)

    # Create a map using the values (with error) associated to the pixel that we belive we observe
    map = HealpixMap{Float64, RingOrder}(setup.NSIDE)
    map.pixels = Sl.tod2map_mpi(ideal_indx, tod, 12*(setup.NSIDE^2))
    
    map

end


function makeIdealMap(
    cam_ang :: Sl.CameraAngles, 
    telescope_ang :: Nothing,
    signal :: Healpix.HealpixMap,
    setup::Setup
    )

    wheelfunction = x -> (0.0, deg2rad(20.0), Sl.timetorotang(x, setup.τ_s*60.))

    pixel_index = getPixelIndex(wheelfunction, cam_ang, telescope_ang, signal, setup)

    sky_tod = signal.pixels[pixel_index]

    map_values = Sl.tod2map_mpi(pixel_index, sky_tod, 12*(setup.NSIDE^2))

    map = HealpixMap{Float64, RingOrder}(setup.NSIDE)
    map.pixels = map_values

    map
end

end # module PrmMaps
