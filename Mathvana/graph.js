var brd = JXG.JSXGraph.initBoard('box', {boundingbox:[-3,10,3,-3],axis:true});
var p = [];
p.push(brd.create('point',[-2,(Math.random()-0.2)*5],{name:''}));
p.push(brd.create('point',[0,(Math.random()-0.2)*5],{name:''}));
p.push(brd.create('point',[2.2,(Math.random()-0.2)*5],{name:''}));

var f = JXG.Math.Numerics.lagrangePolynomial(p);
var plot = brd.create('functiongraph',[f,-3,3]);
var s = brd.create('glider',[-2,0,plot],{name:'drag me'});
var int = brd.create('integral',[[function(){return p[0].X();},function(){return s.X();}],plot],{fillOpacity:0.2});

var F = brd.create('point',[function(){return s.X();}, function(){return JXG.Math.Numerics.I([p[0].X(),s.X()],f);}],
    {trace:true,name:'F',fillColor:'#0000aa',strokeColor:'#0000aa',face:'[]'});
