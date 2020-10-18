let trackList = [
    "every_end",
    "simply_live",
    "retrogade_in_bloom",
    "If I could try and just show you",
    "mt. parador",
    "oh I should just try",
    "what_do_you_say_?",
    "be_until_you_are",
    "dissatisfaction",
    "another_missed_call",
    "sea_in_me",
    "egyptian_night",
    "OH YES",
    "take off all your clothes",
    "once_again",
    "another_chance",
    "if_sorry_misbehave",
]

let trackVisualConfigurations = [
    // if zoom > 1.0 it contracts, if zoom < 1.0 it expands
    // [[zoomX, zoomY], [rotationIntensity], [redIncrement, greenIncrement, blueIncrement], [redTreshold, greenTreshold, blueTreshold]]
    /*00*/ [[1.006, 1.001], [0.],       [0.0016, 0.0010, 0.0012], [0.50, 0.40, 0.80]],
    /*01*/ [[0.994, 1.001], [0.],       [0.0020, 0.0012, 0.0051], [0.60, 0.60, 0.60]],
    /*02*/ [[1.004, 1.001], [-0.00001], [0.0019, 0.0017, 0.0020], [0.50, 0.50, 0.50]],
    /*03*/ [[0.998, 0.998], [0.],       [0.0055, 0.0010, 0.0084], [0.32, 0.28, 0.30]],
    /*04*/ [[1.001, 1.001], [0.],       [0.0109, 0.0028, 0.0060], [0.80, 0.00, 0.20]],
    /*05*/ [[0.960, 0.960], [0.],       [0.0030, 0.0049, 0.0090], [0.60, 0.60, 0.60]],
    /*06*/ [[1.003, 1.003], [0.00001],  [0.0040, 0.0050, 0.0020], [0.40, 0.40, 0.40]],
    /*07*/ [[0.996, 1.001], [0.],       [0.0022, 0.0108, 0.0042], [0.20, 0.80, 0.20]],
    /*08*/ [[0.992, 0.992], [0.],       [0.0100, 0.0090, 0.0108], [0.80, 0.80, 0.80]],
    /*09*/ [[0.989, 0.999], [0.],       [0.0200, 0.0120, 0.0098], [0.94, 0.94, 0.94]],
    /*10*/ [[1.001, 1.000], [0.],       [0.0110, 0.0055, 0.0100], [0.09, 0.08, 0.12]],
    /*11*/ [[0.995, 0.994], [0.],       [0.1000, 0.1000, 0.1000], [0.00, 0.00, 0.00]],
    /*12*/ [[0.992, 0.992], [0.],       [0.0096, 0.0086, 0.0082], [0.81, 0.78, 0.82]],
    /*13*/ [[0.990, 0.990], [0.],       [0.0020, 0.0028, 0.0057], [0.09, 0.09, 0.09]],
    /*14*/ [[1.003, 0.999], [0.00003],  [0.0050, 0.0046, 0.0080], [0.72, 0.68, 0.75]],
    /*15*/ [[1.004, 1.000], [0.],       [0.0030, 0.0022, 0.0012], [0.70, 0.80, 0.90]],
    /*16*/ [[0.990, 1.000], [-0.00001], [0.0015, 0.0019, 0.0021], [0.90, 0.85, 0.80]],
]

var isChrome = !!window.chrome && !/Edge/.test(navigator.userAgent)
var isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)