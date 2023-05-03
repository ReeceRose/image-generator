use image_generator_core::hello;

use clap::Parser;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    /// Optional name to print
    #[arg(short, long)]
    name: Option<String>,
}

fn main() {
    let cli = Cli::parse();
    let name = cli.name.as_deref().unwrap_or("world");

    println!("{}", hello(name));
}
