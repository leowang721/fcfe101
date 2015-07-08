#!/usr/bin/env python
# -*- encoding:utf-8 -*-
################################################################################
#
# Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
#
################################################################################
"""
这个脚本读入iconmoon生成的style.css/style.less文件，提取其中的font icon before
样式，变成less的variable定义。
用法：
gen_variable.py style.css > variables.less

Authors: Han Bing Feng (hanbingfeng@baidu.com)
Date:    2014/08/24 10:00:00
"""
import re

def cssChunks(file, delim='\n'):
    """
    内部方法。
    用于for in 函数，根据传入的delim，分割文件并分块返回。
    Args:
        file: 文件对象
        delim: 分隔符，默认为\n
    Returns:
        string，一个文件块。
    """    
    buf = ""
    while True:
        c = file.read(1)
        if c == '': return
        buf += c
        if c == delim: 
            yield str(buf)
            buf = ""


if __name__ == "__main__":
    # pattern to match string
    # .font-icon-<name>:before {
    #     content: <content>;
    # }
    variablePattern = re.compile("\\s*\\.(font-icon-[^:]*):before"
        "\\s*{\\s*content:\\s*([^;]*);\\s*}")
    
    # read in style.less, split with chunks splitted by a "}"
    with open("style.less", "r") as f:
        print "/**"
        print " * 定义font-icon的content，名字取style.less中class的名字。"
        print " * 内容是由style.less自动生成的。"
        print " */"
        for chunk in cssChunks(f, '}'):
            if (variablePattern.match(chunk)):
                print variablePattern.sub("@\\g<1>:\\g<2>;", chunk)
