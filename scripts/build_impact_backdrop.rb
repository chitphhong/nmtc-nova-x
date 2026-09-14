# frozen_string_literal: true

# Run from SketchUp's Ruby Console with:
# load 'E:/nmtcnova/web app draf2/nmtc-nova-x/scripts/build_impact_backdrop.rb'
module ImpactBackdropBuilder
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
    [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]].each do |face_indices|
      face = entities.add_face(face_indices.map { |index| vertices[index] })
      next unless face
      face.material = material
      face.back_material = material
    end
  end

  def self.beam(entities, from, to, thickness, depth, material)
    ax, ay, az = from
    bx, _by, bz = to
    delta_x = bx - ax
    delta_z = bz - az
    length = Math.sqrt(delta_x * delta_x + delta_z * delta_z)
    normal_x = -delta_z / length * thickness / 2.0
    normal_z = delta_x / length * thickness / 2.0
    vertices = [
      [ax + normal_x, ay, az + normal_z], [ax - normal_x, ay, az - normal_z],
      [bx - normal_x, ay, bz - normal_z], [bx + normal_x, ay, bz + normal_z],
      [ax + normal_x, ay + depth, az + normal_z], [ax - normal_x, ay + depth, az - normal_z],
      [bx - normal_x, ay + depth, bz - normal_z], [bx + normal_x, ay + depth, bz + normal_z]
    ].map { |point| Geom::Point3d.new(point[0] * METER, point[1] * METER, point[2] * METER) }
    [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]].each do |face_indices|
      face = entities.add_face(face_indices.map { |index| vertices[index] })
      next unless face
      face.material = material
      face.back_material = material
    end
  end

  def self.disc(entities, x, y, z, radius, material)
    vertices = []
    12.times do |index|
      angle = index * Math::PI * 2.0 / 12.0
      vertices << Geom::Point3d.new((x + radius * Math.cos(angle)) * METER, y * METER, (z + radius * Math.sin(angle)) * METER)
    end
    face = entities.add_face(vertices)
    return unless face
    face.material = material
    face.back_material = material
  end

  def self.led_rect(entities, x, z, width, height, y, material)
    box(entities, x, y, z, width, 0.018, 0.018, material)
    box(entities, x, y, z + height - 0.018, width, 0.018, 0.018, material)
    box(entities, x, y, z, 0.018, 0.018, height, material)
    box(entities, x + width - 0.018, y, z, 0.018, 0.018, height, material)
  end

  def self.build
    model = Sketchup.active_model
    model.start_operation('Build IMPACT Event Backdrop', true)
    model.entities.each { |entity| entity.visible = false }
    unit_options = model.options['UnitsOptions']
    unit_options['LengthUnit'] = 4
    unit_options['LengthFormat'] = 0
    unit_options['Precision'] = 0.001

    materials = model.materials
    black = material(materials, 'Matte Black', [20, 24, 30])
    orange = material(materials, 'Warm Orange LED', [255, 104, 22])
    blue = material(materials, 'Electric Blue', [26, 156, 213])
    cyan = material(materials, 'Aqua Graphic', [82, 206, 232])
    white = material(materials, 'Graphic White', [242, 248, 248])
    navy = material(materials, 'Deep Blue', [17, 72, 122])
    grey = material(materials, 'Concrete Pot', [150, 157, 158])
    green = material(materials, 'Foliage', [55, 122, 62])

    frame = model.entities.add_group
    frame.name = 'FRAME'
    frame_entities = frame.entities
    box(frame_entities, -1.50, -0.08, 0.00, 3.00, 0.08, 0.05, black)
    box(frame_entities, -1.50, -0.08, 1.78, 3.00, 0.08, 0.05, black)
    [-1.50, -0.90, -0.30, 0.30, 0.90, 1.50].each { |x| box(frame_entities, x - 0.025, -0.08, 0.00, 0.05, 0.08, 1.34, black) }
    [0.05, 0.68, 1.28].each { |z| box(frame_entities, -1.50, -0.08, z, 3.00, 0.08, 0.05, black) }
    box(frame_entities, -1.12, -0.08, 1.28, 0.05, 0.08, 0.50, black)
    box(frame_entities, 1.07, -0.08, 1.28, 0.05, 0.08, 0.50, black)
    box(frame_entities, -1.12, -0.08, 1.71, 2.24, 0.08, 0.05, black)

    panels = model.entities.add_group
    panels.name = 'GRAPHIC_PANEL'
    panel_entities = panels.entities
    panel_layout = [
      [-1.43, 0.10, 0.48, 0.53], [-0.84, 0.10, 0.48, 0.53], [-0.25, 0.10, 0.48, 0.53],
      [0.34, 0.10, 0.48, 0.53], [0.93, 0.10, 0.48, 0.53], [-0.84, 0.74, 0.48, 0.49],
      [-0.25, 0.74, 0.48, 0.49], [0.34, 0.74, 0.48, 0.49], [0.93, 0.74, 0.48, 0.49],
      [-0.25, 1.35, 0.48, 0.30]
    ]
    panel_colors = [cyan, blue, cyan, blue, cyan, blue, cyan, blue, cyan, navy]
    panel_layout.each_with_index do |panel, panel_index|
      box(panel_entities, panel[0], 0.008, panel[1], panel[2], 0.026, panel[3], panel_colors[panel_index])
      15.times do |dot_index|
        x = panel[0] + 0.045 + (((dot_index * 17 + panel_index * 11) % 71) / 100.0) * panel[2]
        z = panel[1] + 0.04 + (((dot_index * 29 + panel_index * 13) % 73) / 100.0) * panel[3]
        radius = 0.012 + (dot_index % 4) * 0.006
        disc(panel_entities, x, -0.018, z, radius, [white, orange, navy, cyan][(dot_index + panel_index) % 4])
      end
    end

    leds = model.entities.add_group
    leds.name = 'LED'
    led_entities = leds.entities
    [
      [-1.46, 0.08, 0.54, 0.58], [-0.87, 0.72, 0.54, 0.54], [-0.28, 0.72, 0.54, 0.54],
      [0.31, 0.72, 0.54, 0.54], [0.90, 0.72, 0.54, 0.54], [0.31, 0.08, 0.54, 0.60],
      [-0.30, 1.32, 0.58, 0.40]
    ].each { |rectangle| led_rect(led_entities, rectangle[0], rectangle[1], rectangle[2], rectangle[3], -0.115, orange) }

    triangles = model.entities.add_group
    triangles.name = 'TRIANGLE'
    triangle_entities = triangles.entities
    first_triangle = [[-1.43, -0.47, 0.05], [-0.77, -0.47, 0.05], [-1.10, -0.47, 0.80]]
    second_triangle = [[-0.72, -0.68, 0.03], [0.05, -0.68, 0.03], [-0.33, -0.68, 0.66]]
    [first_triangle, second_triangle].each do |triangle|
      3.times { |index| beam(triangle_entities, triangle[index], triangle[(index + 1) % 3], 0.075, 0.12, black) }
      3.times { |index| beam(led_entities, triangle[index], triangle[(index + 1) % 3], 0.022, 0.020, orange) }
    end

    hexagon = model.entities.add_group
    hexagon.name = 'HEXAGON'
    hexagon_entities = hexagon.entities
    hexagon_points = []
    6.times do |index|
      angle = Math::PI / 6.0 + index * Math::PI / 3.0
      hexagon_points << [1.08 + 0.43 * Math.cos(angle), -0.58, 0.42 + 0.43 * Math.sin(angle)]
    end
    6.times do |index|
      beam(hexagon_entities, hexagon_points[index], hexagon_points[(index + 1) % 6], 0.085, 0.14, black)
      beam(led_entities, hexagon_points[index], hexagon_points[(index + 1) % 6], 0.024, 0.020, orange)
    end

    plants = model.entities.add_group
    plants.name = 'PLANT'
    plant_entities = plants.entities
    [[-1.32, -0.30, 0.00, 0.22], [-0.03, -0.13, 0.68, 0.16], [0.52, -0.27, 0.00, 0.17], [1.30, -0.22, 0.00, 0.20]].each do |plant|
      x, y, z, size = plant
      box(plant_entities, x - size / 2.0, y, z, size, 0.16, size * 0.62, grey)
      8.times do |leaf_index|
        angle = leaf_index * Math::PI / 4.0
        beam(plant_entities, [x, y - 0.02, z + size * 0.55], [x + Math.cos(angle) * size * 0.7, y - 0.05, z + size * (0.75 + (leaf_index % 3) * 0.25)], 0.025, 0.025, green)
      end
    end

    logo = model.entities.add_group
    logo.name = 'LOGO'
    begin
      logo.entities.add_3d_text('IMPACT', TextAlignLeft, 'Arial', true, false, 0.29 * METER, 0.01 * METER, 0, true, 0.035 * METER)
      logo.entities.grep(Sketchup::Face).each do |face|
        face.material = white
        face.back_material = white
      end
      logo.transform!(Geom::Transformation.translation([-1.32 * METER, -0.17 * METER, 1.30 * METER]) * Geom::Transformation.rotation([0, 0, 0], [1, 0, 0], 90.degrees))
    rescue
      box(logo.entities, -1.25, -0.17, 1.38, 2.50, 0.05, 0.20, white)
    end

    dimensions = model.entities.add_group
    dimensions.name = 'DIMENSIONS'
    begin
      dimension_entities = dimensions.entities
      dimension_entities.add_dimension_linear(Geom::Point3d.new(-1.50 * METER, 0.25 * METER, 0), Geom::Point3d.new(1.50 * METER, 0.25 * METER, 0), Geom::Vector3d.new(0, 0, -0.25 * METER))
      dimension_entities.add_dimension_linear(Geom::Point3d.new(-1.50 * METER, 0.25 * METER, 0), Geom::Point3d.new(-1.50 * METER, 0.25 * METER, 1.80 * METER), Geom::Vector3d.new(-0.30 * METER, 0, 0))
      dimension_entities.add_dimension_linear(Geom::Point3d.new(1.50 * METER, 0, 0), Geom::Point3d.new(1.50 * METER, -2.00 * METER, 0), Geom::Vector3d.new(0.30 * METER, 0, 0))
    rescue
      nil
    end

    view = model.active_view
    perspective_camera = Sketchup::Camera.new(Geom::Point3d.new(4.2 * METER, -6.0 * METER, 3.0 * METER), Geom::Point3d.new(0, 0, 0.90 * METER), Geom::Vector3d.new(0, 0, 1))
    view.camera = perspective_camera
    begin
      model.pages.add('Perspective').update
      view.camera = Sketchup::Camera.new(Geom::Point3d.new(0, -7 * METER, 0.90 * METER), Geom::Point3d.new(0, 0, 0.90 * METER), Geom::Vector3d.new(0, 0, 1))
      model.pages.add('Front').update
      view.camera = Sketchup::Camera.new(Geom::Point3d.new(0, -0.1 * METER, 6 * METER), Geom::Point3d.new(0, 0, 0.60 * METER), Geom::Vector3d.new(0, 1, 0))
      model.pages.add('Top').update
    rescue
      nil
    end
    view.camera = perspective_camera
    model.commit_operation

    output_path = 'E:/nmtcnova/web app draf2/nmtc-nova-x/impact_backdrop_3x1.8x2m.skp'
    if File.exist?(output_path)
      UI.messagebox('Output file already exists; the model is ready but was not overwritten.')
    else
      model.save(output_path)
    end
    UI.messagebox('IMPACT backdrop model created.')
  end
end

ImpactBackdropBuilder.build
