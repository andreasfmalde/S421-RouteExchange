export const waypoints = [
    {
        _attributes: { id: 'RTE.WPT.2' },
        geometry: { pointProperty: { Point: {pos: { _text: '58.97756611 5.72598921' }} } },
        routeWaypointID: { _text: '4' },
        routeWaypointName: { _text: 'Stavanger' },
        routeWaypointExternalReferenceID: {},
        routeWaypointFixed: { _text: 'false' },
        routeWaypointTurnRadius: { _text: '0.0' },
        routeWaypointCollection: { _attributes: { arcrole: 'routeWaypointCollection', href: 'RTE' } },
        routeWaypointLeg: {
          _attributes: { arcrole: 'routeWaypointLeg', href: '#RTE.WPT.LEG.2' }
        }
      },
      {
        _attributes: { id: 'RTE.WPT.3' },
        geometry: { pointProperty: { Point: {pos: { _text: '58.98633212 5.71134896' }} } },
        routeWaypointID: { _text: '18' },
        routeWaypointName: { _text: 'Ulsnesgrunnen' },
        routeWaypointExternalReferenceID: {},
        routeWaypointFixed: { _text: 'false' },
        routeWaypointTurnRadius: { _text: '1.0' },
        routeWaypointCollection: { _attributes: { arcrole: 'routeWaypointCollection', href: 'RTE' } },
        routeWaypointLeg: {
          _attributes: { arcrole: 'routeWaypointLeg', href: '#RTE.WPT.LEG.3' }
        }
      },
      {
        _attributes: { id: 'RTE.WPT.4' },
        geometry: { pointProperty: { Point: {pos: { _text: '59.0034202 5.69128408' }} } },
        routeWaypointID: { _text: '19' },
        routeWaypointName: { _text: 'Dusaviga' },
        routeWaypointExternalReferenceID: {},
        routeWaypointFixed: { _text: 'false' },
        routeWaypointTurnRadius: { _text: '1.0' },
        routeWaypointCollection: { _attributes: { arcrole: 'routeWaypointCollection', href: 'RTE' } },
        routeWaypointLeg: {
          _attributes: { arcrole: 'routeWaypointLeg', href: '#RTE.WPT.LEG.4' }
        }
    }       
]

export const curveWaypointLegResult = [

  {
    type: 'Feature',
    properties: { routeWaypointLeg: 'RTE.WPT.LEG.3' },
    geometry: {
      type: 'LineString',
      coordinates: [
          [ 5.712062833521313, 58.98590404854867 ],
          [ 5.712048833926327, 58.9859128021321 ],
          [ 5.7120348557628065, 58.985921564804826 ],
          [ 5.7120208990529875, 58.98593033655287 ],
          [ 5.712006963819078, 58.985939117362335 ],
          [ 5.711993050083252, 58.985947907219234 ],
          [ 5.711979157867648, 58.9859567061096 ],
          [ 5.7119652871943725, 58.98596551401944 ],
          [ 5.711951438085493, 58.98597433093476 ],
          [ 5.711937610563049, 58.98598315684152 ],
          [ 5.711923804649039, 58.9859919917257 ],
          [ 5.711910020365432, 58.98600083557324 ],
          [ 5.711896257734161, 58.98600968837011 ],
          [ 5.711882516777128, 58.9860185501022 ],
          [ 5.7118687975161935, 58.98602742075545 ],
          [ 5.71185509997319, 58.98603630031573 ],
          [ 5.7118414241699105, 58.98604518876893 ],
          [ 5.711827770128119, 58.986054086100914 ],
          [ 5.71181413786954, 58.98606299229756 ],
          [ 5.711800527415868, 58.98607190734467 ],
          [ 5.711786938788759, 58.986080831228094 ],
          [ 5.7117733720098345, 58.98608976393362 ],
          [ 5.711759827100682, 58.98609870544709 ],
          [ 5.711746304082857, 58.98610765575425 ],
          [ 5.711732802977878, 58.98611661484087 ],
          [ 5.711719323807229, 58.986125582692715 ],
          [ 5.711705866592355, 58.98613455929553 ],
          [ 5.711692431354674, 58.98614354463504 ],
          [ 5.711679018115564, 58.98615253869693 ],
          [ 5.71166562689637, 58.98616154146695 ],
          [ 5.711652257718401, 58.986170552930744 ],
          [ 5.711638910602929, 58.98617957307401 ],
          [ 5.711625585571196, 58.98618860188239 ],
          [ 5.711612282644405, 58.98619763934154 ],
          [ 5.711599001843726, 58.986206685437075 ],
          [ 5.711585743190291, 58.98621574015462 ],
          [ 5.711572506705201, 58.986224803479786 ],
          [ 5.711559292409518, 58.98623387539816 ],
          [ 5.71154610032427, 58.9862429558953 ],
          [ 5.711532930470454, 58.986252044956785 ],
          [ 5.711519782869022, 58.986261142568154 ],
          [ 5.7115066575409, 58.98627024871495 ],
          [ 5.711493554506975, 58.9862793633827 ],
          [ 5.711480473788098, 58.986288486556894 ],
          [ 5.711467415405085, 58.98629761822302 ],
          [ 5.711454379378718, 58.98630675836661 ],
          [ 5.7114413657297405, 58.98631590697306 ],
          [ 5.711428374478863, 58.98632506402788 ],
          [ 5.711415405646761, 58.98633422951646 ],
          [ 5.711402459254071, 58.98634340342428 ],
          [ 5.7113895353213975, 58.98635258573671 ],
          [ 5.711376633869308, 58.986361776439175 ],
          [ 5.711363754918333, 58.98637097551706 ],
          [ 5.711350898488969, 58.98638018295574 ],
          [ 5.711338064601676, 58.98638939874055 ],
          [ 5.711325253276878, 58.98639862285685 ],
          [ 5.711312464534963, 58.986407855289976 ],
          [ 5.711299698396286, 58.98641709602527 ],
          [ 5.71128695488116, 58.986426345048 ],
          [ 5.7112742340098706, 58.98643560234349 ],
          [ 5.7112615358026595, 58.98644486789699 ],
          [ 5.711248860279737, 58.986454141693805 ],
          [ 5.7112362074612735, 58.98646342371917 ],
          [ 5.7112235773674085, 58.98647271395832 ],
          [ 5.711210970018242, 58.986482012396486 ],
          [ 5.711198385433839, 58.98649131901891 ],
          [ 5.711185823634227, 58.98650063381074 ],
          [ 5.711173284639399, 58.9865099567572 ],
          [ 5.711160768469309, 58.98651928784348 ],
          [ 5.711148275143881, 58.9865286270547 ],
          [ 5.711135804682995, 58.98653797437606 ],
          [ 5.7111233571065005, 58.98654732979267 ],
          [ 5.711110932434206, 58.98655669328965 ],
          [ 5.71109853068589, 58.986566064852106 ],
          [ 5.711086151881285, 58.986575444465174 ],
          [ 5.711073796040098, 58.9865848321139 ],
          [ 5.7110614631819905, 58.98659422778339 ],
          [ 5.711049153326594, 58.986603631458664 ],
          [ 5.711036866493499, 58.98661304312479 ],
          [ 5.711024602702262, 58.98662246276683 ],
          [ 5.711012361972402, 58.986631890369765 ],
          [ 5.711000144323401, 58.98664132591862 ],
          [ 5.710987949774705, 58.98665076939841 ],
          [ 5.710975778345724, 58.986660220794086 ],
          [ 5.710963630055829, 58.986669680090635 ],
          [ 5.710951504924356, 58.98667914727304 ],
          [ 5.710939402970604, 58.986688622326184 ],
          [ 5.710927324213836, 58.98669810523507 ],
          [ 5.7109152686732765, 58.986707595984576 ],
          [ 5.710903236368114, 58.98671709455964 ],
          [ 5.710891227317498, 58.98672660094513 ],
          [ 5.710879241540547, 58.986736115125964 ],
          [ 5.710867279056336, 58.98674563708699 ],
          [ 5.710855339883905, 58.986755166813055 ],
          [ 5.71084342404226, 58.98676470428902 ],
          [ 5.710831531550364, 58.986774249499746 ],
          [ 5.710819662427151, 58.986783802430026 ],
          [ 5.71080781669151, 58.986793363064685 ],
          [ 5.7107959943622975, 58.98680293138848 ],
          [ 5.710784195458332, 58.98681250738624 ],
          [ 5.710772419998391, 58.98682209104275 ]
      ]
    }
  },
  {
    type: 'Feature',
    properties: {
      waypoint: 18,
      linkedTo: 4,
      routeWaypointLeg: 'RTE.WPT.LEG.3',
      used: false
    },
    geometry: {
      type: 'Point',
      coordinates: [ 5.71206345064126, 58.985904310904786 ]
    }
  },
  {
    type: 'Feature',
    properties: {
      waypoint: 18,
      linkedTo: 19,
      routeWaypointLeg: 'RTE.WPT.LEG.4',
      used: false
    },
    geometry: {
      type: 'Point',
      coordinates: [ 5.7107732984160755, 58.98682237716571 ]
    }
  }
]