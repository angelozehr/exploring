<?php
switch ($_SERVER['HTTP_HOST']) {
  case 'wohi.sg': $lang1 = 'de'; $lang2 = 'CH'; break;
  case 'wohin.sg': $lang1 = 'de'; $lang2 = 'DE'; break;
  default: $lang1 = 'en'; $lang2 = 'US'; break;
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang1 . '-' . $lang2 ?>">
<head>
  <meta charset="UTF-8">
  <title>Ein St.Galler Stadtführer</title>
  <link rel="canonical" href="<?php echo $_SERVER['HTTP_HOST'] ?>" />
</head>
<body>
<?php
$jsondata = file_get_contents("./data/locations.json");
$locations = json_decode($jsondata);
foreach($locations->data as $index => $location) {
  switch($location->type) {
    case 'eatdrink': $type = 'Restaurant'; break;
    case 'places': $type = 'Place'; break;
    default: $type = 'LocalBusiness'; break;
  }
  $description = 'description_'.$lang1;
  $tags = 'tags_'.$lang1;
?>
<div itemscope itemtype="http://schema.org/<?php echo $type ?>">
  <h3 itemprop="name"><?php echo $location->name ?></h3>
  <meta itemprop="image" content="./public/images/<?php echo $location->slug ?>/1_<?php echo $location->slug ?>.jpg"></meta>
  <article itemprop="description">
    <?php echo $location->$description ?><br />
    <?php echo $location->$tags ?>
  </article>
  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
    <span itemprop="streetAddress"><?php echo $location->address ?></span>
    <span itemprop="addressLocality">St.Gallen</span>,
    <span itemprop="addressRegion">SG</span> <span itemprop="postalCode">9000</span>
  </div>
  <div itemprop="telephone"><?php echo $location->phone ?></div>
  <?php if($location->website !== null) { ?>
    <a itemprop="url" href="<?php echo $location->website ?>"><?php echo $location->website ?></a><br />
  <?php } ?>
  <?php if (strlen($location->open_de) > 4) { ?>
    <meta itemprop="openingHours" datetime="Mo <?php echo $location->mo ?>">Mo <?php echo $location->mo ?><br />
    <meta itemprop="openingHours" datetime="Tu <?php echo $location->di ?>">Tu <?php echo $location->di ?><br />
    <meta itemprop="openingHours" datetime="We <?php echo $location->mi ?>">We <?php echo $location->mi ?><br />
    <meta itemprop="openingHours" datetime="Th <?php echo $location->do ?>">Th <?php echo $location->do ?><br />
    <meta itemprop="openingHours" datetime="Fr <?php echo $location->fr ?>">Fr <?php echo $location->fr ?><br />
    <meta itemprop="openingHours" datetime="Sa <?php echo $location->sa ?>">Sa <?php echo $location->sa ?><br />
    <meta itemprop="openingHours" datetime="So <?php echo $location->so ?>">So <?php echo $location->so ?><br />
  <?php } ?>
  <?php if($location->price !== null) { ?>
    Price Range: <span itemprop="priceRange"><?php for($i=0;$i<$location->price;$i++) { echo '$'; } ?></span>
  <?php } ?>
</div>
<?php } ?>
</body>
</html>