var documenterSearchIndex = {"docs":
[{"location":"polarizedMap/","page":"Polarized map","title":"Polarized map","text":"makePolAngMap\nmakePolDegreeMap\npolAngleMap!\npolDegreeMap!\ndifferenceAngMaps","category":"page"},{"location":"polarizedMap/#PRMaps.makePolAngMap","page":"Polarized map","title":"PRMaps.makePolAngMap","text":"makePolAngMap(\n    cam_ang::Stripeline.CameraAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup\n)\n\nmakePolAngMap(\n    cam_ang::Stripeline.CameraAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup,\n    t_start::Dates.DateTime\n)\n\nmakePolAngMap(\n    cam_ang::Stripeline.CameraAngles,\n    tel_ang::Stripeline.TelescopeAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup\n)\n\nmakePolAngMap(\n    cam_ang::Stripeline.CameraAngles,\n    tel_ang::Stripeline.TelescopeAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup,\n    t_start::Dates.DateTime\n)\n\nReturn the polarization angle map of the sky observed by a telescope  whose camera point towards a direction encoded by the CameraAngles struct.\n\nThe second flavour, with a TelescopeAngles as input, produce a map affected by an error. See makeErroredMap\n\nInput:\n\ncam_ang :: CameraAngles encoding the pointing direction of the detector;\ntel_ang::Stripeline.TelescopeAngles encoding the non idealities of the telescope;\nsignal::Healpix.PolarizedHealpixMap the signal (Q,U,I) that the telescope are going to observe;\nsetup::PRMaps.Setup see Setup.\nt_start::Dates.DateTime allows to set an initial date for the simulation.\n\nOutput:\n\np_map an HealpixMap containing observed angle of polarization. \n\n\n\n\n\n","category":"function"},{"location":"polarizedMap/#PRMaps.makePolDegreeMap","page":"Polarized map","title":"PRMaps.makePolDegreeMap","text":"makePolDegreeMap(\n    cam_ang::Stripeline.CameraAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup\n)\n\nmakePolDegreeMap(\n    cam_ang::Stripeline.CameraAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup,\n    t_start::Dates.DateTime\n)\n\nmakePolDegreeMap(\n    cam_ang::Stripeline.CameraAngles,\n    tel_ang::Stripeline.TelescopeAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup\n)\n\nmakePolDegreeMap(\n    cam_ang::Stripeline.CameraAngles,\n    tel_ang::Stripeline.TelescopeAngles,\n    signal::Healpix.PolarizedHealpixMap,\n    setup::PRMaps.Setup,\n    t_start::Dates.DateTime\n)\n\nReturn the polarization degree map of the sky observed by a telescope  whose camera point towards a direction encoded by the CameraAngles struct.\n\nThe second flavour, with a TelescopeAngles as input, produce a map affected by an error. See makeErroredMap\n\nInput:\n\ncam_ang :: CameraAngles encoding the pointing direction of the detector;\ntel_ang::Stripeline.TelescopeAngles encoding the non idealities of the telescope;\nsignal::Healpix.PolarizedHealpixMap the signal (Q,U,I) that the telescope are going to observe;\nsetup::PRMaps.Setup see Setup;\nt_start::Dates.DateTime allows to set an initial date for the simulation.\n\nOutput:\n\np_map an HealpixMap containing observed degree of polarization. \n\n\n\n\n\n","category":"function"},{"location":"polarizedMap/#PRMaps.polAngleMap!","page":"Polarized map","title":"PRMaps.polAngleMap!","text":"function polAngleMap!(\n    ang_map::HealpixMap,\n    q_map::HealpixMap,\n    u_map::HealpixMap\n)\n\nThis function calculate the polarization angle map and save it in ang_map. The angle of polarization is defined as:\n\n0.5 * atan(U, Q)\n\nUsed internally by makePolAngMap.\n\nInput:\n\nang_map::HealpixMap an empty HealpixMap\nq_map::HealpixMap Q parameter HealpixMap \nu_map::HealpixMap U parameter HealpixMap\n\nOutput:\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"polarizedMap/#PRMaps.polDegreeMap!","page":"Polarized map","title":"PRMaps.polDegreeMap!","text":"function polDegreeMap!(\n    p_map::HealpixMap,\n    i_map::HealpixMap,\n    q_map::HealpixMap,\n    u_map::HealpixMap\n)\n\nThis function calculate the polarization degree (not normalized) map and save it in ang_map. The degree of polarization is defined as:\n\nsqrt(Q^2 + U^2)\n\nUsed internally by makePolAngMap.\n\nInput:\n\np_map::HealpixMap an empty HealpixMap\ni_map::HealpixMap I parameter HealpixMap \nq_map::HealpixMap Q parameter HealpixMap \nu_map::HealpixMap U parameter HealpixMap\n\nOutput:\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"polarizedMap/#PRMaps.differenceAngMaps","page":"Polarized map","title":"PRMaps.differenceAngMaps","text":"differenceAngMaps(\n    a :: HealpixMap,\n    b :: HealpixMap\n)\n\nCalculate the difference between two maps containing the observed polarization angle.\n\nReturn an HealpixMap.\n\nAngles MUST be expressed in RADIANS.\n\n\n\n\n\n","category":"function"},{"location":"#PRMaps.jl","page":"Introduction","title":"PRMaps.jl","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Documentation for PRMaps.jl","category":"page"},{"location":"simpleMap/","page":"Simple map making","title":"Simple map making","text":"Setup\nmakeIdealMap\nmakeErroredMap\nmakeIdealMapIQU\nmakeErroredMapIQU","category":"page"},{"location":"simpleMap/#PRMaps.Setup","page":"Simple map making","title":"PRMaps.Setup","text":"Setup(\n    sampling_freq_Hz :: Float64,\n    total_time_s :: Float64    \n)\n\nStruct containing some useful data.\n\n\n\n\n\n","category":"type"},{"location":"simpleMap/#PRMaps.makeIdealMap","page":"Simple map making","title":"PRMaps.makeIdealMap","text":"makeIdealMap(\n    cam_ang :: Sl.CameraAngles, \n    signal :: Healpix.HealpixMap,\n    setup :: Setup\n)\n\nGenerate a Healpix map using an ideal telescope model.\n\nReturn a tuple (map, hits)::(HealpixMap, HealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\nmakeIdealMap(\n    cam_ang :: Sl.CameraAngles, \n    signal :: Healpix.HealpixMap,\n    setup :: Setup\n    t_start :: Dates.DateTime\n)\n\nGenerate a Healpix map using an ideal telescope model.\n\nReturn a tuple (map, hits)::(HealpixMap, HealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\n","category":"function"},{"location":"simpleMap/#PRMaps.makeErroredMap","page":"Simple map making","title":"PRMaps.makeErroredMap","text":"makeErroredMap(\n    cam_ang :: Sl.CameraAngles, \n    telescope_angles :: Sl.TelescopeAngles,\n    signal :: Healpix.HealpixMap,\n    setup :: Setup\n)\n\nGenerate a Healpix map using a telescope model that takes into account the non idealities to generate the pointing direction. The observed values instead are calculated taking into account the ideal pointing directions.  The result is a map affected by an error due to the non idealities of the system.\n\nReturn a tuple (map, hits)::(HealpixMap, HealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\nmakeErroredMap(\n    cam_ang :: Sl.CameraAngles, \n    telescope_angles :: Sl.TelescopeAngles,\n    signal :: Healpix.HealpixMap,\n    setup :: Setup,\n    t_start :: Dates.DateTime\n)\n\nGenerate a Healpix map using a telescope model that takes into account the non idealities to generate the pointing direction. The observed values instead are calculated using the ideal pointing directions.  The result is a map affected by an error due to the non idealities of the system.\n\nReturn a tuple (map, hits)::(HealpixMap, HealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\n","category":"function"},{"location":"simpleMap/#PRMaps.makeIdealMapIQU","page":"Simple map making","title":"PRMaps.makeIdealMapIQU","text":"makeIdealMap(\n    cam_ang :: Sl.CameraAngles, \n    signal :: Healpix.PolarizedHealpixMap,\n    setup :: Setup\n)\n\nGenerate a PolarizedHealpix map (I,Q,U) using an ideal telescope model.\n\nReturn a tuple (map, hits)::(PolarizedHealpixMap, PolarizedHealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\nmakeIdealMap(\n    cam_ang :: Sl.CameraAngles, \n    signal :: Healpix.PolarizedHealpixMap,\n    setup :: Setup,\n    t_start :: Dates.DateTime\n)\n\nGenerate a PolarizedHealpix map (I,Q,U) using an ideal telescope model.\n\nReturn a tuple (map, hits)::(PolarizedHealpixMap, PolarizedHealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\n","category":"function"},{"location":"simpleMap/#PRMaps.makeErroredMapIQU","page":"Simple map making","title":"PRMaps.makeErroredMapIQU","text":"makeErroredMap(\n    cam_ang :: Sl.CameraAngles, \n    telescope_angles :: Sl.TelescopeAngles,\n    signal :: Healpix.PolarizedHealpixMap,\n    setup :: Setup\n)\n\nGenerate a PolarizedHealpix map (I,Q,U) using a telescope model that takes into account the non idealities to generate the pointing direction. The observed values instead are calculated taking into account the ideal pointing directions.  The result is a map affected by an error due to the non idealities of the system.\n\nReturn a tuple (map, hits)::(PolarizedHealpixMap, PolarizedHealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\nmakeErroredMap(\n    cam_ang :: Sl.CameraAngles, \n    telescope_angles :: Sl.TelescopeAngles,\n    signal :: Healpix.PolarizedHealpixMap,\n    setup :: Setup,\n    t_start :: Dates.DateTime\n)\n\nGenerate a PolarizedHealpix map (I,Q,U) using a telescope model that takes into account the non idealities to generate the pointing direction. The observed values instead are calculated taking into account the ideal pointing directions.  The result is a map affected by an error due to the non idealities of the system.\n\nReturn a tuple (map, hits)::(PolarizedHealpixMap, PolarizedHealpixMap):\n\nmap contains the obserbed values of signal;\nhits contains for every pixels the count of how many times the pixel is seen.\n\n\n\n\n\n","category":"function"}]
}
