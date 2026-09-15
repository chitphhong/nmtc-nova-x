# frozen_string_literal: true

# Run from SketchUp's Ruby Console with:
# load 'E:/nmtcnova/web app draf2/nmtc-nova-x/scripts/decorate_impact2013_led_plants.rb'
module Impact2013LedPlants
  METER = 39.37007874

  def self.material(materials, name, rgb)
    item = materials[name] || materials.add(name)
    item.color = Sketchup::Color.new(rgb[0], rgb[1], rgb[2])
    item
  end

  def self.box(entities, x, y, z, width, depth, height, material)
    x *= METER
    y *= METER
    z *= METER
    width *= METER
    depth *= METER
    height *= METER
    vertices = [
      [x, y, z], [x + width, y, z], [x + width, y + depth, z], [x, y + depth, z],
      [x, y, z + height], [x + width, y, z + height],
      [x + width, y + depth, z + height], [x, y + depth, z + height]
    ].map { |point| Geom::Point3d.new(point[0], point[1], point[2]) }
    [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]].each do |indices|
      face = entities.add_face(indices.map { |index| vertices[index] })
      next unless face
      face.material = material
      face.back_material = material
    end
  end

  def self.foliage(entities, x, y, z, radius, height, material)
    base = []
    10.times do |index|
      angle = index * Math::PI * 2.0 / 10.0
      base << Geom::Point3d.new((x + radius * Math.cos(angle)) * METER, (y + radius * Math.sin(angle)) * METER, z * METER)
    end
    top = Geom::Point3d.new(x * METER, y * METER, (z + height) * METER)
    10.times do |index|
      face = entities.add_face(base[index], base[(index + 1) % 10], top)
      next unless face
      face.material = material
      face.back_material = material
    end
  end

  def self.build
    model = Sketchup.active_model
    bounds = model.bounds
    x0 = bounds.min.x / METER
    x1 = bounds.max.x / METER
    y_front = bounds.min.y / METER - 0.035
    z0 = bounds.min.z / METER
    z1 = bounds.max.z / METER
    width = x1 - x0
    height = z1 - z0
    raise 'The opened model has no usable dimensions.' if width <= 0.1 || height <= 0.1

    model.start_operation('Add LED Lighting and 5 Plants', true)
    materials = model.materials
    orange = material(materials, 'Warm Orange LED', [255, 105, 20])
    charcoal = material(materials, 'Planter Charcoal', [52, 58, 62])
    foliage_dark = material(materials, 'Foliage Dark', [48, 118, 62])
    foliage_light = material(materials, 'Foliage Light', [86, 162, 77])

    led_group = model.entities.add_group
    led_group.name = 'LED'
    led_group.set_attribute('IMPACT_DECOR', 'type', 'Warm orange LED strips')
    leds = led_group.entities
    thickness = [width * 0.007, 0.022].min
    strip_depth = 0.022
    left = x0 + width * 0.035
    right = x1 - width * 0.035
    lower = z0 + height * 0.055
    upper = z1 - height * 0.050
    horizontal_width = right - left
    vertical_height = upper - lower

    # Main perimeter and inner modular accents, all projected slightly in front of the existing backdrop.
    box(leds, left, y_front, lower, horizontal_width, strip_depth, thickness, orange)
    box(leds, left, y_front, upper, horizontal_width, strip_depth, thickness, orange)
    box(leds, left, y_front, lower, thickness, strip_depth, vertical_height, orange)
    box(leds, right - thickness, y_front, lower, thickness, strip_depth, vertical_height, orange)
    [0.22, 0.50, 0.78].each do |ratio|
      x = x0 + width * ratio
      box(leds, x, y_front, z0 + height * 0.16, thickness, strip_depth, height * 0.55, orange)
    end
    [0.33, 0.66].each do |ratio|
      z = z0 + height * ratio
      box(leds, x0 + width * 0.12, y_front, z, width * 0.76, strip_depth, thickness, orange)
    end

    plant_group = model.entities.add_group
    plant_group.name = 'PLANT'
    plant_group.set_attribute('IMPACT_DECOR', 'count', 5)
    plants = plant_group.entities
    pot_size = [[width * 0.070, 0.18].max, 0.24].min
    pot_height = pot_size * 0.72
    pot_depth = pot_size * 0.78
    plant_positions = [0.08, 0.28, 0.50, 0.72, 0.91]
    plant_positions.each_with_index do |ratio, index|
      x = x0 + width * ratio - pot_size / 2.0
      y = y_front - pot_depth - 0.018
      box(plants, x, y, z0, pot_size, pot_depth, pot_height, charcoal)
      center_x = x + pot_size / 2.0
      center_y = y + pot_depth / 2.0
      foliage(plants, center_x, center_y, z0 + pot_height, pot_size * 0.66, pot_size * 1.50, index.even? ? foliage_dark : foliage_light)
      foliage(plants, center_x + pot_size * 0.18, center_y - pot_size * 0.10, z0 + pot_height + pot_size * 0.14, pot_size * 0.45, pot_size * 1.12, foliage_light)
    end

    model.commit_operation
    model.active_view.zoom_extents
    output_path = 'E:/nmtcnova/ohmmy/impact2013_led_plants.skp'
    if File.exist?(output_path)
      UI.messagebox('Decor was added, but impact2013_led_plants.skp already exists and was not overwritten.')
    else
      model.save(output_path)
      UI.messagebox('LED lighting and 5 planters added. Saved as impact2013_led_plants.skp')
    end
  rescue => error
    model.abort_operation if model && model.active_operation?
    UI.messagebox("Could not add decor: #{error.message}")
    raise error
  end
end

Impact2013LedPlants.build
