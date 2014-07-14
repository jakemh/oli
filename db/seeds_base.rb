module SeedsBase


  def self.id_hash
    @@id_hash ||= {}
  end

  def self.component_constant(string)
    if string
      component_constant = Kernel.const_get(string) 
    else component_constant = Component
    end
  end

   #csv_id => actual_id
  def self.parse_activity(row)
    course = Course.find_or_create_by(:name => row["course"]) if row["course"]
    topic = Topic.find_or_create_by(:course => course, :name => row["topic"]) if row["topic"]
    section = Section.find_or_create_by(:topic => topic, :name => row["section"]) if row["section"]
    # course = Course.where(:name => row["course"]).first if row["course"]
    # topic = Topic.where(:name => row["topic"], :course => course).first if row["topic"]
    # section = Section.where(:name => row["section"], :topic => topic).first if row["section"]
    display = row["display"].to_i == 1 ? true : false 
    components = []
    dependencies = []

   

    puts row["c_1_file_name"]
    if row["c_1_name"]
      components << self.component_constant(row["c_1_type"]).create!(
        :context => row["c_1_name"],
        :content => row["sub_text_1"],
        :file_name => row["c_1_file_name"]
        )
    end

     if row["c_2_name"]
      components << self.component_constant(row["c_2_type"]).create!(
        :context => row["c_2_name"], 
        :content => row["sub_text_2"],
        :file_name => row["c_2_file_name"]

        )
    end

     if row["c_3_name"]
      components << self.component_constant(row["c_3_type"]).create!(
        :context => row["c_3_name"], 
        :content => row["sub_text_3"],
        :file_name => row["c_3_file_name"]

        )
    end

    

    a = Activity.create!(
      :section => section,
      :template => row["template"],
      :name => row["title"],
      :description => row["main_text"],
      :tip => row["tip"],
      :display => display
      )

    a.components << components
    self.id_hash[row["id"]] = a.id

    if row["dependencies"]
      row["dependencies"].split(",").each do |id|
        dependencies << ActivityDependency.create(
          :dependent_activity_id => self.id_hash[id]
          )
      end
    end


    a.activity_dependencies << dependencies

    if row["boxes"]
      a.components.first.boxes << row["boxes"].to_i.times.inject([]){|result, element| result << Box.create}
    end
  end
end